import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import basicSsl from "@vitejs/plugin-basic-ssl";

// https://vitejs.dev/config/
export default defineConfig({
    optimizeDeps: {
        include: ["@fawmi/vue-google-maps", "fast-deep-equal"],
        exclude: ["stream", "os"],
    },
    plugins: [vue(), basicSsl()],
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url)),
        },
    },
});
