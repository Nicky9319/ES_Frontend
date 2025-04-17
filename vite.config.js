import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import path from "path";

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => {
  // Check if we need to use the GitHub Pages path prefix
  const useGitHubPages = process.env.USE_GITHUB_PAGES === "true";
  const base = useGitHubPages ? "/Gryork_Frontend/" : "/";

  return {
    plugins: [
      react({
        // Add fast refresh configuration
        fastRefresh: true,
      }),
      tailwindcss(),
    ],
    base: base,
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
    server: {
      host: "0.0.0.0", // Expose to all network interfaces
      watch: {
        usePolling: true, // Enables polling for file changes, useful in WSL or VM environments
        ignored: ["**/node_modules/**", "**/dist/**"],
      },
      proxy: {
        // Proxy requests to your ngrok tunnel
        "/api":
          "https://5e59-2409-4050-2d17-7982-9576-fbc4-25aa-6721.ngrok-free.app",
        "/Teams": {
          target: "http://localhost:14000",
          changeOrigin: true,
          secure: false,
        },
      },
      cors: {
        // Allow access from the ngrok tunnel origin
        host: "0.0.0.0",
        origin:
          "https://5e59-2409-4050-2d17-7982-9576-fbc4-25aa-6721.ngrok-free.app",
      },
      hmr: {
        clientPort: 5173, // If using HTTPS ngrok tunnel, set to 443
        host: "localhost",
        overlay: true, // Shows full-screen overlay when errors occur
        timeout: 20000, // Increase timeout for slower connections
      },
    },
    optimizeDeps: {
      include: ["recharts"],
      force: true,
    },
  };
});
