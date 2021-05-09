import legacy from "@vitejs/plugin-legacy";
import glob from "glob";
import autoprefixer from "autoprefixer";
import uncss from "postcss-uncss";

const isProd = process.env.NODE_ENV === "production" || null;

const buildFolder = "__build__";
const assetsFolder = "___assets__";
const isLegacy = false; // set True if you want to support older browsers or < ES2015

export default {
  root: "./src",
  build: {
    rollupOptions: {
      input: glob.sync("./src/**/*.html"),
      output: {
        entryFileNames: `${buildFolder}/js/[name].js`,
        chunkFileNames: `${buildFolder}/chunks/[name].js`,
        assetFileNames: (e) => {
          if (/\.css$/.test(e.name))
            return `${buildFolder}/css/[name].[hash].css`;

          return `${buildFolder}/images/[name].[hash].[ext]`;
        },
      },
    },
    outDir: "../dist",
    assetsDir: assetsFolder,
    emptyOutDir: true,
  },
  css: {
    postcss: {
      plugins: isProd && [
        autoprefixer({ grid: "autoplace" }),
        uncss({ html: ["./src/**/*.html"] }),
      ],
    },
  },
  plugins: [
    isLegacy &&
      legacy({
        targets: ["defaults"],
      }),
  ],
};
