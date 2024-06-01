import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { postDetailsSelection } from "../../../../../sanity/groqd/selections/post-details";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import { getPostsByCategoryId } from "../../../../../sanity/queries/post/getPostsByCategoryId";
import { getPostsByTagId } from "../../../../../sanity/queries/post/getPostsByTagId";
import { getTagsByCategoryId } from "../../../../../sanity/queries/tags/getTagsByCategoryId";
import { webhookBodyQuery } from "./query";
import { serverEnv } from "@/env/env-server";
import { useCdn } from "../../../../../sanity/env";

const webhookBodySchema = webhookBodyQuery.slice(0).schema;

export const POST = async (req: NextRequest) => {
  try {
    const { isValidSignature, body } = await parseBody<unknown>(
      req,
      serverEnv.SANITY_REVALIDATE_SECRET,
      true,
    );

    if (!isValidSignature) {
      const message = "Invalid signature";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 401,
      });
    }

    const parseResult = webhookBodySchema.safeParse(body);
    if (!parseResult.success) {
      const message = "Invalid body";
      return new Response(JSON.stringify({ message, isValidSignature, body }), {
        status: 400,
      });
    }

    if (useCdn) {
      console.warn(
        "Sanity revalidate webhook called, but the app is currently using Sanity's CDN. Revalidation may not work as expected.",
      );
    }

    const data = parseResult.data;
    const extraData: Record<string, unknown> = {};
    const tags = new Set<string>();

    const revalidate = (tag: string) => {
      if (!tag || tags.has(tag)) return;
      tags.add(tag);
      revalidateTag(tag);
    };

    revalidate(data.type);

    switch (data.type) {
      case "post":
        revalidate(data.id);
        revalidate(data.slug);
        data.tags.forEach((tag) => {
          revalidate(tag.id);
          revalidate(tag.slug);
          revalidate(tag.category.id);
          revalidate(tag.category.slug);
        });
        break;
      case "category":
        revalidate(data.id);
        revalidate(data.slug);
        const [categoryTags, categoryPosts] = await Promise.all([
          getTagsByCategoryId(
            data.id,
            pick(tagDetailsSelection, ["id", "slug"]),
          ),
          getPostsByCategoryId(
            data.id,
            pick(postDetailsSelection, ["id", "slug"]),
          ),
        ]);

        extraData.categoryTags = categoryTags;
        extraData.categoryPosts = categoryPosts;

        categoryTags.forEach((tag) => {
          revalidate(tag.id);
          revalidate(tag.slug);
        });
        categoryPosts.forEach((post) => {
          revalidate(post.id);
          revalidate(post.slug);
        });
        break;
      case "tag":
        revalidate(data.id);
        revalidate(data.slug);
        const tagPosts = await getPostsByTagId(
          data.id,
          pick(postDetailsSelection, ["id", "slug"]),
        );
        tagPosts.forEach((post) => {
          revalidate(post.id);
          revalidate(post.slug);
        });
        revalidate(data.category.id);
        revalidate(data.category.slug);
        break;
    }

    const payload = {
      revalidatedTags: Array.from(tags),
      data,
      extraData,
    } as const;

    return NextResponse.json(payload);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }
};
