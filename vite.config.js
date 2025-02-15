import { join } from "node:path"
import { buildSync } from "esbuild"
import { defineConfig } from "vite"

const path = require("path")

export default defineConfig({
  root: path.resolve(__dirname, "src"),
  build: {
    outDir: "../dist",
    rollupOptions: {
      input: {
        main: path.resolve(__dirname, "src/index.html"),
        nested: path.resolve(__dirname, "src/lighthouse/index.html"),
      },
      output: {
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",

        assetFileNames: ({ name }) => {
          if (/\.(gif|jpe?g|png|svg)$/.test(name ?? "")) {
            return "assets/images/[name]-[hash][extname]"
          }

          if (/\.css$/.test(name ?? "")) {
            return "assets/css/[name]-[hash][extname]"
          }

          if (/\.(pdf|docx)$/.test(name ?? "")) {
            return "assets/[name]-[hash][extname]"
          }

          // default value
          // ref: https://rollupjs.org/guide/en/#outputassetfilenames
          return "assets/[name]-[hash][extname]"
        },
      },
    },
  },
  server: {
    port: 8080,
  },
  plugins: [
    {
      apply: "build",
      enforce: "post",
      transformIndexHtml() {
        buildSync({
          minify: true,
          bundle: true,
          entryPoints: [join(process.cwd(), "service-worker.js")],
          outfile: join(process.cwd(), "dist", "service-worker.js"),
        })
      },
    },
  ],
})
