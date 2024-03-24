import { createVanillaExtractPlugin } from "@vanilla-extract/next-plugin";
import crypto from "crypto";

const withVanillaExtract = createVanillaExtractPlugin();

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    // Grab the existing rule that handles SVG imports
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      // Reapply the existing rule, but only for svg imports ending in ?url
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/, // *.svg?url
      },
      // Convert all other *.svg imports to React components
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] }, // exclude if *.svg?url
        use: ({ resource }) => {
          return [
            {
              loader: "@svgr/webpack",
              options: {
                ref: true,
                svgoConfig: {
                  plugins: [
                    {
                      name: "preset-default",
                      params: {
                        overrides: {
                          removeViewBox: false,
                        },
                      },
                    },
                    {
                      name: "prefixIds",
                      params: {
                        delim: "",
                        prefix: () =>
                          crypto
                            .createHash("md5")
                            .update(resource)
                            .digest("hex"),
                      },
                    },
                  ],
                },
              },
            },
          ];
        },
      },
    );

    // Modify the file loader rule to ignore *.svg, since we have it handled now.
    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },

  async headers() {
    const headers = [];
    if (process.env.NEXT_PUBLIC_VERCEL_ENV !== "production") {
      headers.push({
        headers: [
          {
            key: "X-Robots-Tag",
            value: "noindex",
          },
        ],
        source: "/:path*",
      });
    }
    return headers;
  },
};

export default withVanillaExtract(nextConfig);
