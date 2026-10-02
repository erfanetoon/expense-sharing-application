import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        plugins: [react(), tailwindcss()],
        server: {
            port: Number(env.VITE_PORT) || 5173,
        },
        resolve: {
            dedupe: [
                "@mui/material",
                "@mui/x-date-pickers",
                "react",
                "react-dom",
                "i18next",
                "react-i18next",
            ],
            tsconfigPaths: true,
        },
    };
});
