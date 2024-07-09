import { defineConfig } from 'astro/config';
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";

import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://danielmamuza.com",
  base: "/",
  integrations: [react(), tailwind(), playformCompress(), sitemap()]
});