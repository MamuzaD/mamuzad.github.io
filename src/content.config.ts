import { glob } from "astro/loaders"
import { type ImageFunction, defineCollection, z } from "astro:content"

const imageSchema = (image: ImageFunction) =>
  z.object({
    img: image(),
    alt: z.string().optional(),
  })

const work = defineCollection({
  loader: glob({ base: "./src/content/work", pattern: "**/*.md" }),
  schema: ({ image }) =>
    z.object({
      // basic
      title: z.string(),
      caption: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),

      // links
      githubLink: z.string().optional(),
      demoLink: z.string().optional(),
      liveLink: z.string().optional(),

      // tags
      tags: z.array(z.string()),

      // images
      banner: imageSchema(image),
      card: imageSchema(image),
      imgs: z.array(imageSchema(image)).optional(),
    }),
})

export const collections = { work }
