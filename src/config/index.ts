const env = import.meta.env;

export const config = {
	apiKey: env.VITE_API_KEY ?? env.NEXT_PUBLIC_API_KEY ?? "",
	baseUrl: env.VITE_BASE_URL ?? env.NEXT_PUBLIC_BASE_URL ?? undefined,
	mixPanelToken:
		env.VITE_MIX_PANEL_TOKEN ?? env.NEXT_PUBLIC_MIX_PANEL_TOKEN ?? "",
} as const;
