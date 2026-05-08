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

const trackEvent: TrackEvent = (...args) => {
	const event = args[0];

	switch (event) {
		case "Connected wallet": {
			const address = args[1]?.address as string | undefined;
			zendesk.setAddress(address);
			break;
		}

		case "Widget disconnect clicked":
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

export const Widget = () => {
	return (
		<>
			<SKApp
				apiKey={config.apiKey}
				baseUrl={config.baseUrl}
				theme={{
					...darkTheme,
					fontSize: {},
					color: {
						...darkTheme.color,
						tabBorder: colors.purple,
						background: colors.primaryDark,
						modalBodyBackground: colors.primaryDark,
						selectValidatorMultiDefaultBackground: colors.primaryDark,
						positionsSectionBackgroundColor: colors.primaryDark,
						positionsSectionBorderColor: colors.primaryDark,

						connectKit: {
							...darkTheme.color.connectKit,
							modalBackground: colors.primaryDark,
							profileForeground: colors.primaryDark,
						},

						stakeSectionBackground: colors.secondaryDark,
						tokenSelectHoverBackground: colors.secondaryDarkHover,
						backgroundMuted: "#29282A",
						tokenSelectBackground: colors.secondaryDark,
						positionsSectionDividerColor: "#FFFFFF0D",

						skeletonLoaderBase: "#FFFFFF0D",
						skeletonLoaderHighlight: "#2B2B2B",
						dropdownBackground: colors.primaryDark,
						warningBoxBackground: "#FFFFFF0D",

						// Primary Button
						primaryButtonBackground: colors.purple,
						primaryButtonOutline: colors.purple,

						primaryButtonActiveBackground: colors.purple,
						primaryButtonActiveOutline: colors.purple,

						primaryButtonHoverBackground: colors.purpleHover,
						primaryButtonHoverOutline: colors.purpleHover,

						// Secondary Button
						secondaryButtonBackground: colors.secondaryDark,
						secondaryButtonOutline: colors.secondaryDark,

						secondaryButtonActiveBackground: colors.primaryDark,
						secondaryButtonActiveOutline: colors.primaryDark,
						secondaryButtonActiveColor: "#EEF0F2",

						secondaryButtonHoverBackground: colors.secondaryDarkHover,
						secondaryButtonHoverOutline: colors.secondaryDarkHover,
						secondaryButtonHoverColor: "#EEF0F2",

						// Disabled Button
						disabledButtonBackground: "#dfd8ff",
						disabledButtonOutline: "#dfd8ff",
						disabledButtonColor: "#747474",

						// Small Button
						smallButtonBackground: colors.tertiaryDark,
						smallButtonOutline: colors.tertiaryDark,

						smallButtonHoverBackground: colors.tertiaryDarkHover,
						smallButtonHoverOutline: colors.tertiaryDarkHover,

						smallLightButtonBackground: colors.tertiaryDark,
						smallLightButtonOutline: colors.tertiaryDark,

						smallLightButtonHoverBackground: colors.tertiaryDarkHover,
						smallLightButtonHoverOutline: colors.tertiaryDarkHover,
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
			/>

			<Box marginTop={{ tablet: "0", mobile: "8" }}>
				<HelpModals />
			</Box>
		</>
	);
};
