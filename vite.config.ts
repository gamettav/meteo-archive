import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import dns from "dns";

dns.setDefaultResultOrder("verbatim");
// https://vitejs.dev/config/
export default defineConfig({
   plugins: [react()],
   server: { port: 3000 },
   resolve: {
      alias: {
         "@": path.resolve(__dirname, "./src"),
         "@components": path.resolve(__dirname, "./src/components"),
      },
   },
});
