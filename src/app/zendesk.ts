const ZENDESK_SCRIPT_ID = "ze-snippet";
const ZENDESK_SCRIPT_SRC =
	"https://static.zdassets.com/ekr/snippet.js?key=54523efc-d53c-4faa-aa4a-eff74b99e162";

const ADDRESS_FIELD_ID = "57587095436313";
const APP_FIELD_ID = "57587084056345";

class Zendesk {
	private conversationFields = new Map<string, string>([
		[APP_FIELD_ID, "ledger_live_earn"],
	]);
	private isLoading = false;
	private shouldOpenOnLoad = false;

	load() {
		if (typeof window === "undefined" || typeof document === "undefined") {
			return;
		}

		if (window.zE) {
			this.syncConversationFields();
			this.openMessenger();
			return;
		}

		if (this.isLoading || document.getElementById(ZENDESK_SCRIPT_ID)) {
			return;
		}

		this.isLoading = true;

		const script = document.createElement("script");
		script.id = ZENDESK_SCRIPT_ID;
		script.async = true;
		script.src = ZENDESK_SCRIPT_SRC;
		script.addEventListener("load", () => {
			this.isLoading = false;
			this.syncConversationFields();
			this.openMessenger();
		});
		script.addEventListener("error", () => {
			this.isLoading = false;
		});

		document.body.appendChild(script);
	}

	setAddress(address: string | undefined) {
		this.conversationFields.set(ADDRESS_FIELD_ID, address ?? "");
		this.syncConversationFields();
	}

	open() {
		if (typeof window === "undefined" || typeof document === "undefined") {
			return;
		}

		if (window.zE) {
			this.shouldOpenOnLoad = true;
			this.openMessenger();
			return;
		}

		this.shouldOpenOnLoad = true;
		this.load();
	}

	private syncConversationFields() {
		if (!window.zE) {
			return;
		}

		const fields = Array.from(this.conversationFields, ([id, value]) => ({
			id,
			value,
		}));

		if (!fields.length) {
			return;
		}

		window.zE("messenger:set", "conversationFields", fields);
	}

	private openMessenger() {
		if (!window.zE || !this.shouldOpenOnLoad) {
			return;
		}

		this.shouldOpenOnLoad = false;
		window.zE("messenger", "open");
	}
}

export const zendesk = new Zendesk();
