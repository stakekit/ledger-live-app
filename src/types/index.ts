declare global {
	interface Window {
		Intercom?: (
			event: "boot" | "update",
			opts: {
				api_base?: string;
				app_id?: string;
				address?: string;
			},
		) => void;
	}
}

export {};
