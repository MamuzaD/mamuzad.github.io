import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";
import sitemap from "@astrojs/sitemap";
import vercel from "@astrojs/vercel/serverless";

// https://astro.build/config
export default defineConfig({
  site: "https://danielmamuza.com",
  base: "/",
  integrations: [
    react(),
    tailwind(),
    playformCompress(),
    sitemap({
      filter: (page) =>
        page !== "http://danielmamuza.com/old/" &&
        page !== "https://danielmamuza.com/old/",
    }),
  ],
  output: "hybrid",
  adapter: vercel({ webAnalytics: { enabled: true } }),
});
