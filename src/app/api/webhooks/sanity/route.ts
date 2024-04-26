import { q } from "groqd";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { categoryDetailsSelection } from "../../../../../sanity/groqd/selections/category-details";
import { pick } from "../../../../../sanity/groqd/selections/pick";
import { postDetailsSelection } from "../../../../../sanity/groqd/selections/post-details";
import { tagDetailsSelection } from "../../../../../sanity/groqd/selections/tag-details";
import { getPostsByCategoryId } from "../../../../../sanity/queries/post/getPostsByCategoryId";
import { getPostsByTagId } from "../../../../../sanity/queries/post/getPostsByTagId";
import { getTagsByCategoryId } from "../../../../../sanity/queries/tags/getTagsByCategoryId";

const webhookBodyQuery = q("*")
  .filter("_type in ['post', 'category', 'tag', 'author']")
  .select({
    "_type == 'post'": {
      type: ["_type", q.literal("post")],
      id: postDetailsSelection.id,
      slug: postDetailsSelection.slug,
      tags: q("tags")
        .filter()
        .deref()
        .grab$({
          id: tagDetailsSelection.id,
          slug: tagDetailsSelection.slug,
          category: q("category").deref().grab$({
            id: categoryDetailsSelection.id,
            slug: categoryDetailsSelection.slug,
          }),
        }),
    },
    "_type == 'category'": {
      type: ["_type", q.literal("category")],
      id: postDetailsSelection.id,
      slug: postDetailsSelection.slug,
    },
    "_type == 'tag'": {
      type: ["_type", q.literal("tag")],
      id: postDetailsSelection.id,
      slug: postDetailsSelection.slug,
      category: q("category").deref().grab$({
        id: categoryDetailsSelection.id,
        slug: categoryDetailsSelection.slug,
      }),
    },
  })
  .slice(0);

const webhookBodySchema = webhookBodyQuery.schema;

export const POST = async (req: NextRequest) => {
  try {
    const { isValidSignature, body } = await parseBody<unknown>(
      req,
      process.env.SANITY_REVALIDATE_SECRET,
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

    const data = parseResult.data;
    const extraData: Record<string, unknown> = {};
    const tags = new Set<string>();

    const revalidate = (tag: string) => {
      if (!tag || tags.has(tag)) return;
      tags.add(tag);
      revalidateTag(tag);
    };

    revalidate(data.id);
    revalidate(data.slug);
    revalidate(data.type);

    switch (data.type) {
      case "post":
        data.tags.forEach((tag) => {
          revalidate(tag.id);
          revalidate(tag.slug);
          revalidate(tag.category.id);
          revalidate(tag.category.slug);
        });
        break;
      case "category":
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
