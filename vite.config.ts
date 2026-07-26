import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Deployed to https://anmolbajpai24.github.io (user site, served from root).
export default defineConfig({
  plugins: [react()],
  base: "/",
});
