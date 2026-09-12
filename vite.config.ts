import { defineConfig } from "vite";
import vinext from "vinext";
import { nitro } from "nitro/vite";
import { sites } from "@openai/sites-vite-plugin";
import tailwindcss from "@tailwindcss/postcss";

export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwindcss()],
    },
  },

  plugins: [
    vinext(),
    sites(),
    nitro(),
  ],
});