import { q } from "groqd";
import { parseBody } from "next-sanity/webhook";
import { revalidateTag } from "next/cache";
import { NextResponse, type NextRequest } from "next/server";
import { categoryDetailsSelection } from "../../../../../sanity/selections/category-details";
import { postDetailsSelection } from "../../../../../sanity/selections/post-details";
import { tagDetailsSelection } from "../../../../../sanity/selections/tag-details";
import { isDefined, type Defined } from "@/utils/isDefined";

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
          type: ["_type", q.literal("tag")],
          id: tagDetailsSelection.id,
          slug: tagDetailsSelection.slug,
          category: q("category")
            .deref()
            .grab$({
              type: ["_type", q.literal("category")],
              id: categoryDetailsSelection.id,
              slug: categoryDetailsSelection.slug,
            }),
        }),
    },
  })
  .slice(0);

const webhookBodySchema = webhookBodyQuery.schema;

export async function POST(req: NextRequest) {
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
    const tags = new Set<string>();

    tags.add(data.id);
    tags.add(data.slug);
    tags.add(data.type);

    switch (data.type) {
      case "post":
        data.tags.forEach((tag) => {
          tags.add(tag.id);
          tags.add(tag.slug);
          tags.add(tag.category.id);
          tags.add(tag.category.slug);
        });
        break;
    }

    const revalidatedTags = Array.from(tags)
      .filter((t): t is Defined<string> => isDefined(t))
      .map((t) => {
        revalidateTag(t);
        return t;
      });

    const payload = {
      data,
      revalidatedTags,
    } as const;

    return NextResponse.json(payload);
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }
}
