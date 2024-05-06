// Generated by ts-to-zod
import { q as z } from "groqd";

export const sanityImagePaletteSwatchSchema = z.object({
  _type: z.literal("sanity.imagePaletteSwatch"),
  background: z.string().optional(),
  foreground: z.string().optional(),
  population: z.number().optional(),
  title: z.string().optional(),
});

export const sanityImagePaletteSchema = z.object({
  _type: z.literal("sanity.imagePalette"),
  darkMuted: sanityImagePaletteSwatchSchema.optional(),
  lightVibrant: sanityImagePaletteSwatchSchema.optional(),
  darkVibrant: sanityImagePaletteSwatchSchema.optional(),
  vibrant: sanityImagePaletteSwatchSchema.optional(),
  dominant: sanityImagePaletteSwatchSchema.optional(),
  lightMuted: sanityImagePaletteSwatchSchema.optional(),
  muted: sanityImagePaletteSwatchSchema.optional(),
});

export const sanityImageDimensionsSchema = z.object({
  _type: z.literal("sanity.imageDimensions"),
  height: z.number().optional(),
  width: z.number().optional(),
  aspectRatio: z.number().optional(),
});

export const sanityAssetSourceDataSchema = z.object({
  _type: z.literal("sanity.assetSourceData"),
  name: z.string().optional(),
  id: z.string().optional(),
  url: z.string().optional(),
});

export const geopointSchema = z.object({
  _type: z.literal("geopoint"),
  lat: z.number().optional(),
  lng: z.number().optional(),
  alt: z.number().optional(),
});

export const sanityImageHotspotSchema = z.object({
  _type: z.literal("sanity.imageHotspot"),
  x: z.number().optional(),
  y: z.number().optional(),
  height: z.number().optional(),
  width: z.number().optional(),
});

export const sanityImageCropSchema = z.object({
  _type: z.literal("sanity.imageCrop"),
  top: z.number().optional(),
  bottom: z.number().optional(),
  left: z.number().optional(),
  right: z.number().optional(),
});

export const codeSchema = z.object({
  _type: z.literal("code"),
  language: z.string().optional(),
  filename: z.string().optional(),
  code: z.string().optional(),
  highlightedLines: z.array(z.number()).optional(),
});

export const homeIntroSchema = z.object({
  _type: z.literal("homeIntro"),
  title: z.string(),
  content: z.array(
    z.union([
      z.object({
        children: z
          .array(
            z.object({
              marks: z.array(z.string()).optional(),
              text: z.string().optional(),
              _type: z.literal("span"),
              _key: z.string(),
            }),
          )
          .optional(),
        style: z
          .union([
            z.literal("normal"),
            z.literal("h2"),
            z.literal("h3"),
            z.literal("h4"),
            z.literal("h5"),
            z.literal("h6"),
            z.literal("blockquote"),
          ])
          .optional(),
        listItem: z.literal("bullet").optional(),
        markDefs: z
          .array(
            z.object({
              href: z.string().optional(),
              _type: z.literal("link"),
              _key: z.string(),
            }),
          )
          .optional(),
        level: z.number().optional(),
        _type: z.literal("block"),
        _key: z.string(),
      }),
      z.object({
        asset: z
          .object({
            _ref: z.string(),
            _type: z.literal("reference"),
            _weak: z.boolean().optional(),
          })
          .optional(),
        hotspot: sanityImageHotspotSchema.optional(),
        crop: sanityImageCropSchema.optional(),
        alt: z.string(),
        _type: z.literal("image"),
        _key: z.string(),
      }),
      z
        .object({
          _key: z.string(),
        })
        .and(codeSchema),
    ]),
  ),
  image: z.object({
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
        _weak: z.boolean().optional(),
      })
      .optional(),
    hotspot: sanityImageHotspotSchema.optional(),
    crop: sanityImageCropSchema.optional(),
    alt: z.string(),
    _type: z.literal("image"),
  }),
});

export const blogSettingsSchema = z.object({
  _id: z.string(),
  _type: z.literal("blogSettings"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  caption: z.string(),
  description: z.string(),
  image: z.object({
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
        _weak: z.boolean().optional(),
      })
      .optional(),
    hotspot: sanityImageHotspotSchema.optional(),
    crop: sanityImageCropSchema.optional(),
    alt: z.string(),
    _type: z.literal("image"),
  }),
});

export const postContentSchema = z.array(
  z.union([
    z.object({
      children: z
        .array(
          z.object({
            marks: z.array(z.string()).optional(),
            text: z.string().optional(),
            _type: z.literal("span"),
            _key: z.string(),
          }),
        )
        .optional(),
      style: z
        .union([
          z.literal("normal"),
          z.literal("h2"),
          z.literal("h3"),
          z.literal("h4"),
          z.literal("h5"),
          z.literal("h6"),
          z.literal("blockquote"),
        ])
        .optional(),
      listItem: z.literal("bullet").optional(),
      markDefs: z
        .array(
          z.object({
            href: z.string().optional(),
            _type: z.literal("link"),
            _key: z.string(),
          }),
        )
        .optional(),
      level: z.number().optional(),
      _type: z.literal("block"),
      _key: z.string(),
    }),
    z.object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      alt: z.string(),
      _type: z.literal("image"),
      _key: z.string(),
    }),
    z
      .object({
        _key: z.string(),
      })
      .and(codeSchema),
  ]),
);

export const slugSchema = z.object({
  _type: z.literal("slug"),
  current: z.string(),
  source: z.string().optional(),
});

export const categorySchema = z.object({
  _id: z.string(),
  _type: z.literal("category"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  name: z.string(),
  slug: slugSchema,
  caption: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  image: z.object({
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
        _weak: z.boolean().optional(),
      })
      .optional(),
    hotspot: sanityImageHotspotSchema.optional(),
    crop: sanityImageCropSchema.optional(),
    alt: z.string(),
    _type: z.literal("image"),
  }),
});

export const postSchema = z.object({
  _id: z.string(),
  _type: z.literal("post"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  title: z.string(),
  summary: z.string(),
  slug: slugSchema,
  author: z.object({
    _ref: z.string(),
    _type: z.literal("reference"),
    _weak: z.boolean().optional(),
  }),
  tags: z.array(
    z.object({
      _ref: z.string(),
      _type: z.literal("reference"),
      _weak: z.boolean().optional(),
      _key: z.string(),
    }),
  ),
  keywords: z.array(z.string()).optional(),
  giscusTerm: z.string(),
  image: z.object({
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
        _weak: z.boolean().optional(),
      })
      .optional(),
    hotspot: sanityImageHotspotSchema.optional(),
    crop: sanityImageCropSchema.optional(),
    alt: z.string(),
    _type: z.literal("image"),
  }),
  body: postContentSchema,
});

export const authorSchema = z.object({
  _id: z.string(),
  _type: z.literal("author"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  name: z.string(),
  slug: slugSchema,
  image: z.object({
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
        _weak: z.boolean().optional(),
      })
      .optional(),
    hotspot: sanityImageHotspotSchema.optional(),
    crop: sanityImageCropSchema.optional(),
    alt: z.string(),
    _type: z.literal("image"),
  }),
  bio: z.string(),
});

export const sanityImageMetadataSchema = z.object({
  _type: z.literal("sanity.imageMetadata"),
  location: geopointSchema.optional(),
  dimensions: sanityImageDimensionsSchema.optional(),
  palette: sanityImagePaletteSchema.optional(),
  lqip: z.string().optional(),
  blurHash: z.string().optional(),
  hasAlpha: z.boolean().optional(),
  isOpaque: z.boolean().optional(),
});

export const hslaColorSchema = z.object({
  _type: z.literal("hslaColor"),
  h: z.number().optional(),
  s: z.number().optional(),
  l: z.number().optional(),
  a: z.number().optional(),
});

export const hsvaColorSchema = z.object({
  _type: z.literal("hsvaColor"),
  h: z.number().optional(),
  s: z.number().optional(),
  v: z.number().optional(),
  a: z.number().optional(),
});

export const rgbaColorSchema = z.object({
  _type: z.literal("rgbaColor"),
  r: z.number().optional(),
  g: z.number().optional(),
  b: z.number().optional(),
  a: z.number().optional(),
});

export const sanityFileAssetSchema = z.object({
  _id: z.string(),
  _type: z.literal("sanity.fileAsset"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  originalFilename: z.string().optional(),
  label: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  altText: z.string().optional(),
  sha1hash: z.string().optional(),
  extension: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
  assetId: z.string().optional(),
  uploadId: z.string().optional(),
  path: z.string().optional(),
  url: z.string().optional(),
  source: sanityAssetSourceDataSchema.optional(),
});

export const homeSkillsSchema = z.object({
  _type: z.literal("homeSkills"),
  title: z.string(),
  content: z.array(
    z.union([
      z.object({
        children: z
          .array(
            z.object({
              marks: z.array(z.string()).optional(),
              text: z.string().optional(),
              _type: z.literal("span"),
              _key: z.string(),
            }),
          )
          .optional(),
        style: z
          .union([
            z.literal("normal"),
            z.literal("h2"),
            z.literal("h3"),
            z.literal("h4"),
            z.literal("h5"),
            z.literal("h6"),
            z.literal("blockquote"),
          ])
          .optional(),
        listItem: z.literal("bullet").optional(),
        markDefs: z
          .array(
            z.object({
              href: z.string().optional(),
              _type: z.literal("link"),
              _key: z.string(),
            }),
          )
          .optional(),
        level: z.number().optional(),
        _type: z.literal("block"),
        _key: z.string(),
      }),
      z.object({
        asset: z
          .object({
            _ref: z.string(),
            _type: z.literal("reference"),
            _weak: z.boolean().optional(),
          })
          .optional(),
        hotspot: sanityImageHotspotSchema.optional(),
        crop: sanityImageCropSchema.optional(),
        alt: z.string(),
        _type: z.literal("image"),
        _key: z.string(),
      }),
      z
        .object({
          _key: z.string(),
        })
        .and(codeSchema),
    ]),
  ),
  skillGroups: z.array(
    z.object({
      name: z.string(),
      skills: z.array(
        z.object({
          name: z.string(),
          level: z.union([
            z.literal(1),
            z.literal(2),
            z.literal(3),
            z.literal(4),
            z.literal(5),
          ]),
          image: z
            .object({
              asset: z
                .object({
                  _ref: z.string(),
                  _type: z.literal("reference"),
                  _weak: z.boolean().optional(),
                })
                .optional(),
              hotspot: sanityImageHotspotSchema.optional(),
              crop: sanityImageCropSchema.optional(),
              alt: z.string(),
              _type: z.literal("image"),
            })
            .optional(),
          _key: z.string(),
        }),
      ),
      _key: z.string(),
    }),
  ),
});

export const colorSchema = z.object({
  _type: z.literal("color"),
  hex: z.string().optional(),
  alpha: z.number().optional(),
  hsl: hslaColorSchema.optional(),
  hsv: hsvaColorSchema.optional(),
  rgb: rgbaColorSchema.optional(),
});

export const tagSchema = z.object({
  _id: z.string(),
  _type: z.literal("tag"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  name: z.string(),
  slug: slugSchema,
  category: z.object({
    _ref: z.string(),
    _type: z.literal("reference"),
    _weak: z.boolean().optional(),
  }),
  caption: z.string(),
  description: z.string(),
  keywords: z.array(z.string()).optional(),
  image: z.object({
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
        _weak: z.boolean().optional(),
      })
      .optional(),
    hotspot: sanityImageHotspotSchema.optional(),
    crop: sanityImageCropSchema.optional(),
    alt: z.string(),
    _type: z.literal("image"),
  }),
});

export const sanityImageAssetSchema = z.object({
  _id: z.string(),
  _type: z.literal("sanity.imageAsset"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  originalFilename: z.string().optional(),
  label: z.string().optional(),
  title: z.string().optional(),
  description: z.string().optional(),
  altText: z.string().optional(),
  sha1hash: z.string().optional(),
  extension: z.string().optional(),
  mimeType: z.string().optional(),
  size: z.number().optional(),
  assetId: z.string().optional(),
  uploadId: z.string().optional(),
  path: z.string().optional(),
  url: z.string().optional(),
  metadata: sanityImageMetadataSchema.optional(),
  source: sanityAssetSourceDataSchema.optional(),
});

export const homeHeroSchema = z.object({
  _type: z.literal("homeHero"),
  title: z.string(),
  subtitle: z.string(),
  image: z.object({
    asset: z
      .object({
        _ref: z.string(),
        _type: z.literal("reference"),
        _weak: z.boolean().optional(),
      })
      .optional(),
    hotspot: sanityImageHotspotSchema.optional(),
    crop: sanityImageCropSchema.optional(),
    alt: z.string(),
    _type: z.literal("image"),
  }),
  logos: z.array(
    z.object({
      asset: z
        .object({
          _ref: z.string(),
          _type: z.literal("reference"),
          _weak: z.boolean().optional(),
        })
        .optional(),
      hotspot: sanityImageHotspotSchema.optional(),
      crop: sanityImageCropSchema.optional(),
      alt: z.string(),
      darkShadow: colorSchema,
      _type: z.literal("logo"),
      _key: z.string(),
    }),
  ),
});

export const homePageSchema = z.object({
  _id: z.string(),
  _type: z.literal("homePage"),
  _createdAt: z.string(),
  _updatedAt: z.string(),
  _rev: z.string(),
  sections: z
    .array(
      z.union([
        z
          .object({
            _key: z.string(),
          })
          .and(homeHeroSchema),
        z
          .object({
            _key: z.string(),
          })
          .and(homeIntroSchema),
        z
          .object({
            _key: z.string(),
          })
          .and(homeSkillsSchema),
      ]),
    )
    .optional(),
});
