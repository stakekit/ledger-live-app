declare global {
	interface Window {
		zE?: {
			(
				action: "messenger:set",
				type: "conversationFields",
				value: {
					id: string;
					value: string;
				}[],
			): void;
			(action: "messenger", command: "open"): void;
		};
	}
}

export {};
