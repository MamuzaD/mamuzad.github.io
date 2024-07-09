import { defineConfig } from 'astro/config';

import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import playformCompress from "@playform/compress";

// https://astro.build/config
export default defineConfig({
  site: "https://danielmamuza.com",
  integrations: [react(), tailwind(), playformCompress()],
});