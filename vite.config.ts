import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed to https://anmolbajpai.com (custom domain, served from root).
export default defineConfig({
  plugins: [react()],
  base: "/",
});
