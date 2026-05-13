const env = import.meta.env;

export const config = {
	apiKey: "e199a0f3-cb4e-4022-9e03-01430ce0f600",
	baseUrl: "https://api.stg.stakek.it/",
	mixPanelToken:
		env.VITE_MIX_PANEL_TOKEN ?? env.NEXT_PUBLIC_MIX_PANEL_TOKEN ?? "",
} as const;
