/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import { ImageResponse } from "next/og";
import type { ImageDetails } from "../../../../../sanity/groqd/selections/image-details";
import { getImageBuilder } from "../../../../../sanity/utils/image";
import type { AuthorDetails } from "../../../../../sanity/groqd/selections/author-details";
import type { TagDetails } from "../../../../../sanity/groqd/selections/tag-details";

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

const getInterRegular = async () => {
  const response = await fetch(
    new URL("/font/Inter/Inter-Regular.ttf", "https://www.chintristan.io/"),
  );
  const interRegular = await response.arrayBuffer();

  return interRegular;
};

const getInterMedium = async () => {
  const response = await fetch(
    new URL("/font/Inter/Inter-Medium.ttf", "https://www.chintristan.io/"),
  );
  const interMedium = await response.arrayBuffer();

  return interMedium;
};

const getInterBold = async () => {
  const response = await fetch(
    new URL("/font/Inter/Inter-Bold.ttf", "https://www.chintristan.io/"),
  );
  const interSemiBold = await response.arrayBuffer();

  return interSemiBold;
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

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "black",
        }}
      >
        <img
          src={imageUrl}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
            backgroundColor: "rgba(0, 0, 0, 0.85)",
            color: "#fafaf9",
          }}
        >
          {tags.length > 0 && (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                flexWrap: "wrap",
                maxWidth: "896px",
              }}
            >
              {tags.map((tag) => (
                <span
                  key={tag.name}
                  style={{
                    backgroundColor: "#e7e5e4",
                    color: "#262626",
                    padding: "4px 12px",
                    borderRadius: "9999px",
                    fontSize: "24px",
                    lineHeight: "32px",
                    marginBottom: "16px",
                    marginLeft: tag !== tags[0] ? "16px" : "0",
                  }}
                >
                  {tag.name}
                </span>
              ))}
            </div>
          )}

          {title && (
            <div
              style={{
                fontSize: "60px",
                lineHeight: "1",
                maxWidth: "1024px",
                textAlign: "center",
                fontWeight: 700,
              }}
            >
              {title}
            </div>
          )}

          {description && (
            <div
              style={{
                maxWidth: "1024px",
                textAlign: "center",
                fontSize: "24px",
                lineHeight: "32px",
                color: "#d6d3d1",
                marginTop: "16px",
              }}
            >
              {description}
            </div>
          )}

          {(author || date) && (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                marginTop: "16px",
                color: "#d6d3d1",
              }}
            >
              {author && authorAvatarUrl && (
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={authorAvatarUrl}
                    style={{ borderRadius: "9999px" }}
                    width={authorAvatarSize}
                    height={authorAvatarSize}
                  />
                  <div
                    style={{
                      marginLeft: "16px",
                      fontSize: "30px",
                      lineHeight: "36px",
                    }}
                  >
                    {author.name}
                  </div>
                </div>
              )}

              {author && date && (
                <div
                  style={{
                    margin: "0 16px",
                  }}
                >
                  •
                </div>
              )}
              {date && (
                <div
                  style={{
                    fontSize: "30px",
                    lineHeight: "36px",
                  }}
                >
                  {new Date(date).toLocaleDateString("en", {
                    dateStyle: "long",
                  })}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    ),
    {
      ...ogImageSize,
      fonts: [
        {
          name: "Inter",
          style: "normal",
          weight: 400,
          data: await getInterRegular(),
        },
        {
          name: "Inter",
          style: "normal",
          weight: 500,
          data: await getInterMedium(),
        },
        {
          name: "Inter",
          style: "normal",
          weight: 700,
          data: await getInterBold(),
        },
      ],
    },
  );
};
