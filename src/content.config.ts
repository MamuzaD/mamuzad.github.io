import { glob } from "astro/loaders"
import { defineCollection, z } from "astro:content"

export const collections = {
  work: defineCollection({
    loader: glob({ base: "./src/content/work", pattern: "**/*.md" }),
    schema: z.object({
      title: z.string(),
      description: z.string(),
      publishDate: z.coerce.date(),
      githubLink: z.string().optional(),
      demoLink: z.string().optional(),
      liveLink: z.string().optional(),
      tags: z.array(z.string()),
      img: z.string(),
      img_alt: z.string().optional(),
    }),
  }),
}
