import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8000", //There sld be a backendserver running At this, else it'll pickup the existing the front server
        changeOrigin: true, // Changes the origin of the request to match the target server.
        secure: false,
      },
    },
  },
});
