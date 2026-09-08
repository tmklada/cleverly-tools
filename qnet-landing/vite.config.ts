import { defineConfig } from "vite";
import { fileURLToPath, URL } from "node:url";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: { "@": fileURLToPath(new URL("./src", import.meta.url)) },
  },
  build: {
    target: "es2020",
    rollupOptions: {
      output: {
        // SINGLE_FILE=1 → bundle واحد (يُستخدم لتوليد معاينة مضمّنة)
        manualChunks: process.env.SINGLE_FILE
          ? undefined
          : { motion: ["framer-motion"], icons: ["lucide-react"] },
      },
    },
  },
});
