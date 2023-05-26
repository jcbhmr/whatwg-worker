import { defineConfig } from "vite";
import dts from "vite-plugin-dts";
import noBundle from "vite-plugin-no-bundle";

export default defineConfig({
  build: {
    ssr: true,
    lib: {
      entry: ["src/index.ts", "src/polyfill.ts", "src/ponyfill.ts"],
      formats: ["es"],
      fileName: "index",
    },
  },
  plugins: [dts(), noBundle()],
});
