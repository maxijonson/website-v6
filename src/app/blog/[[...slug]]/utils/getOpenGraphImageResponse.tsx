/* eslint-disable */
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import type { ImageDetails } from "../../../../../sanity/groqd/selections/image-details";
import { getImageBuilder } from "../../../../../sanity/utils/image";
import type { AuthorDetails } from "../../../../../sanity/groqd/selections/author-details";
import type { TagDetails } from "../../../../../sanity/groqd/selections/tag-details";
import { cn } from "@/lib/utils";
import { getBaseURL } from "@/utils/getBaseURL";

export interface GetOpenGraphImageResponseProps {
  image: ImageDetails;
  title?: string;
  description?: string;
  author?: Pick<AuthorDetails, "name" | "image">;
  date?: string;
  tags?: Pick<TagDetails, "name">[];
}

export const ogImageSize = {
  width: 1200,
  height: 630,
} as const;

type FontWeight = 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
type FontStyle = "normal" | "italic";
const loadFont = async ({
  url,
  ...config
}: {
  name: string;
  url: URL;
  style: FontStyle;
  weight: FontWeight;
}) => {
  try {
    let res: Response | null = null;
    res = await fetch(url.toString());
    if (!res.ok) {
      res = await fetch(new URL(url.pathname, "https://www.chintristan.io"));
      if (!res.ok) {
        return undefined;
      }
    }
    return {
      ...config,
      data: await res.arrayBuffer(),
    };
  } catch {
    return undefined;
  }
};

export const getOpenGraphImageResponse = async ({
  image,
  author,
  title,
  description,
  date,
  tags = [],
}: GetOpenGraphImageResponseProps) => {
  const imageUrl = getImageBuilder(image).blur(100).url();

  const authorAvatarSize = 80;
  const authorAvatarUrl = author
    ? getImageBuilder(author.image)
        .quality(100)
        .size(authorAvatarSize, authorAvatarSize)
        .url()
    : null;

  const fonts = (
    await Promise.all([
      loadFont({
        name: "Inter",
        url: new URL("/font/Inter/Inter-Regular.ttf", getBaseURL()),
        style: "normal",
        weight: 400,
      }),
      loadFont({
        name: "Inter",
        url: new URL("/font/Inter/Inter-Medium.ttf", getBaseURL()),
        style: "normal",
        weight: 500,
      }),
      loadFont({
        name: "Inter",
        url: new URL("/font/Inter/Inter-Bold.ttf", getBaseURL()),
        style: "normal",
        weight: 700,
      }),
    ])
  ).filter((font): font is NonNullable<typeof font> => font !== undefined);

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full h-full items-center justify-center bg-black">
        <img
          src={imageUrl}
          tw="w-full h-full absolute top-0 left-0"
          style={{ objectFit: "cover" }}
        />
        <div tw="bg-black/85 w-full h-full flex flex-col justify-center items-center text-stone-50">
          {tags.length > 0 && (
            <div tw="flex justify-center flex-wrap max-w-4xl">
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  tw={cn(
                    "bg-stone-200 text-stone-800 px-3 py-1 rounded-full text-2xl mb-4",
                    {
                      "ml-4": tag !== tags[0],
                    },
                  )}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {title && (
            <div tw="text-6xl max-w-5xl text-center font-bold">{title}</div>
          )}

          {description && (
            <div tw="max-w-5xl text-2xl text-center text-stone-300 mt-4">
              {description}
            </div>
          )}

          {(author || date) && (
            <div tw="flex items-center mt-4 text-stone-300">
              {/* {author && authorAvatarUrl && (
                <div tw="flex items-center">
                  <img
                    src={authorAvatarUrl}
                    tw="rounded-full"
                    width={authorAvatarSize}
                    height={authorAvatarSize}
                  />
                  <div tw="ml-4 text-3xl">{author.name}</div>
                </div>
              )}

              {author && date && <div tw="mx-4">•</div>}

              {date && (
                <div tw="text-3xl">
                  {new Date(date).toLocaleDateString("en", {
                    dateStyle: "long",
                  })}
                </div>
              )} */}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: fonts.length > 0 ? fonts : undefined,
    },
  );
};
