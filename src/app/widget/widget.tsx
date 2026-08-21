import "@stakekit/widget/style.css";
import { darkTheme, SKApp, type SKAppProps } from "@stakekit/widget";
import { Box } from "@/components/atoms/box";
import { config } from "../../config";
import { colors } from "../../styles/tokens/colors";
import { tracking } from "../tracking";
import { zendesk } from "../zendesk";
import { HelpModals } from "./help-modals";

type WidgetTracking = NonNullable<SKAppProps["tracking"]>;
type TrackEvent = NonNullable<WidgetTracking["trackEvent"]>;
type TrackEventValue = Parameters<TrackEvent>[0];

const CONNECTED_WALLET_EVENT: TrackEventValue = "Connected wallet";
const DISCONNECTED_WALLET_EVENT: TrackEventValue = "Widget disconnect clicked";

const trackEvent: TrackEvent = (...args) => {
	const event = args[0];

	switch (event) {
		case CONNECTED_WALLET_EVENT: {
			const address = args[1]?.address as string | undefined;
			zendesk.setAddress(address);
			break;
		}

		case DISCONNECTED_WALLET_EVENT:
			zendesk.setAddress(undefined);
			break;

		default:
			break;
	}

	tracking.trackEvent(...args);
};

const widgetTracking = {
	...tracking,
	trackEvent,
} satisfies WidgetTracking;

const darkThemeColor = darkTheme.color ?? {};
const darkThemeConnectKit =
	typeof darkThemeColor.connectKit === "object"
		? darkThemeColor.connectKit
		: {};

export const Widget = () => {
	return (
		<SKApp
			apiKey={config.apiKey}
			baseUrl={config.baseUrl}
			theme={{
				...darkTheme,
				fontSize: {},
				color: {
					...darkThemeColor,
					tabBorder: colors.purple,
					background: colors.primaryDark,
					modalBodyBackground: colors.primaryDark,
					selectValidatorMultiDefaultBackground: colors.primaryDark,

					connectKit: {
						...darkThemeConnectKit,
						modalBackground: colors.primaryDark,
						profileForeground: colors.primaryDark,
					},

					stakeSectionBackground: colors.secondaryDark,
					tokenSelectHoverBackground: colors.secondaryDarkHover,
					backgroundMuted: "#29282A",
					tokenSelectBackground: colors.secondaryDark,

					skeletonLoaderBase: "#FFFFFF0D",
					skeletonLoaderHighlight: "#2B2B2B",
					dropdownBackground: colors.primaryDark,
					warningBoxBackground: "#FFFFFF0D",

					// Buttons. The widget derives hover and active shades from these
					// base colors, so only the base tokens are configurable.
					primaryButtonBackground: colors.purple,

					secondaryButtonBackground: colors.secondaryDark,
					secondaryButtonColor: "#EEF0F2",

					disabledButtonBackground: "#dfd8ff",
					disabledButtonColor: "#747474",

					smallButtonBackground: colors.tertiaryDark,
					smallLightButtonBackground: colors.tertiaryDark,
				},
				borderRadius: {
					baseContract: {
						xl: "5px",
						"2xl": "5px",
						primaryButton: "5px",
						secondaryButton: "5px",
						base: "3px",
						smallButton: "5px",
					},
					connectKit: {
						modal: "5px",
						menuButton: "5px",
					},
				},
			}}
			customTranslations={{
				en: {
					translation: {
						yield_types: {
							native_staking: {
								cta: "Earn",
							},
							pooled_staking: {
								cta: "Earn",
							},
							staking: {
								cta: "Earn",
							},
							"liquid-staking": {
								cta: "Earn",
							},
						},
					},
				},
			}}
			tracking={widgetTracking}
		>
			<Box marginTop={{ tablet: "0", mobile: "8" }}>
				<HelpModals />
			</Box>
		</SKApp>
	);
};
