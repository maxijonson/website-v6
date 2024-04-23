import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";
import { parseBody } from "next-sanity/webhook";
import { q, type InferType } from "groqd";
import { qIn } from "../../../../../sanity/utils/groqd/in";

const webhookBodyQueryFilter = q("*").filter(
  qIn("_type", ["post", "category", "tag"]),
);

const slugSchema = q.object({
  current: q.string(),
});

const webhookBodyQuery = webhookBodyQueryFilter
  .select({
    "_type == 'post'": {
      _type: q.literal("post"),
      _id: q.string(),
      slug: slugSchema,
    },
    "_type == 'category'": {
      _type: q.literal("category"),
      _id: q.string(),
      slug: slugSchema,
    },
    "_type == 'tag'": {
      _type: q.literal("tag"),
      _id: q.string(),
      slug: slugSchema,
    },
  })
  .slice(0);

export const webhookBodySchema = webhookBodyQuery.schema;
export type WebhookBody = InferType<typeof webhookBodySchema>;

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
    const revalidatedTags: string[] = [data._type, data._id, data.slug.current];

    revalidatedTags.forEach((t) => revalidateTag(t));

    return NextResponse.json({ data, revalidatedTags });
  } catch (err) {
    console.error(err);
    if (err instanceof Error) {
      return new Response(err.message, { status: 500 });
    }
    return new Response("An unknown error occurred", { status: 500 });
  }
}
