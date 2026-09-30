import path from "node:path";
import { defineConfig, type UserConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// Supervisor exports DISABLE_HOT_RELOAD=true when the platform sets ENABLE_RELOAD=false.
const hotReloadDisabled = process.env.DISABLE_HOT_RELOAD === "true";

// Branded error overlay (build + runtime errors); escape hatch mirrors the two above.
const emergentOverlayDisabled = process.env.DISABLE_EMERGENT_OVERLAY === "true";

// Pod inotify quota is node-shared and routinely exhausted; native fs.watch EMFILEs at
// boot. Polling is the load-bearing default (set before Vite evaluates the config).
if (!hotReloadDisabled) {
  process.env.CHOKIDAR_USEPOLLING = "true";
}

// https://vite.dev/config/
export default defineConfig(async () => {
  return {
    plugins: [
      react(),
      tailwindcss(),
    ],
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    // Every shipped dep, pre-bundled up front. Vite discovers deps lazily, so the first
    // import outside the initial graph would trigger a re-optimize + reload mid-session.
    optimizeDeps: {
      include: [
        "@base-ui/react/button",
        "@base-ui/react/checkbox",
        "@base-ui/react/dialog",
        "@base-ui/react/input",
        "@base-ui/react/menu",
        "@base-ui/react/merge-props",
        "@base-ui/react/popover",
        "@base-ui/react/select",
        "@base-ui/react/tabs",
        "@base-ui/react/use-render",
        "@tanstack/react-query",
        "clsx",
        "date-fns",
        "lucide-react",
        "motion/react",
        "next-themes",
        "react",
        "react-day-picker",
        "react-dom/client",
        "react-is",
        "react-router-dom",
        "recharts",
        "sonner",
        "tailwind-merge",
      ],
    },
    server: {
      host: true,
      port: 3000,
      allowedHosts: true,
      // Preview probe + /edit-file are cross-origin from the Emergent tab; Vite defaults to localhost-only CORS.
      cors: true,
      // No hmr.clientPort override: Vite infers the WS target from window.location, which
      // is correct on both localhost:3000 (smoke) and the https/:443 preview proxy.
      // Build-error rendering: emergent-overlay when it loaded, else Vite's own overlay.
      hmr: hotReloadDisabled ? false : { overlay: emergentOverlayDisabled },
      watch: hotReloadDisabled ? null : { usePolling: true, interval: 300 },
      // The /api proxy convention: frontend code calls relative /api/*, never an
      // absolute backend URL. Target is the FastAPI dev server (supervisor: backend).
      proxy: {
        "/api": {
          target: "http://localhost:8000", // Sesuaikan ke port 8000 (port uvicorn FastAPI kamu)
          changeOrigin: true,
        },
      },
    },
  } satisfies UserConfig;
});