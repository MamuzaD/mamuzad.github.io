// @ts-check
import react from "@astrojs/react"
import tailwind from "@astrojs/tailwind"
import vercel from "@astrojs/vercel"
import icon from "astro-icon"
import { defineConfig } from "astro/config"

// https://astro.build/config
export default defineConfig({
  integrations: [
    react(),
    tailwind({
      applyBaseStyles: false,
    }),
    ,
    icon(),
  ],
  output: "server",
  adapter: vercel({
    maxDuration: 20,
    webAnalytics: { enabled: true },
  }),
  image: {
    remotePatterns: [{ protocol: "https" }],
    domains: ["api.microlink.io"],
  },
})
