import { fileURLToPath, URL } from "node:url";
import { vanillaExtractPlugin } from "@vanilla-extract/vite-plugin";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
	appType: "spa",
	envPrefix: ["VITE_", "NEXT_PUBLIC_"],
	plugins: [react(), vanillaExtractPlugin()],
	resolve: {
		alias: {
			"@": fileURLToPath(new URL("./src", import.meta.url)),
		},
	},
	server: {
		port: 3002,
	},
	preview: {
		port: 3002,
	},
});
