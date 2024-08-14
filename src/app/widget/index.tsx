"use client"
import "@stakekit/widget/style.css"
import { SKApp, darkTheme } from "@stakekit/widget"
import { config } from "../../config"
import { tracking } from "../tracking"
import Script from "next/script"
import { useState } from "react"
import { colors } from "../../styles/tokens/colors"

export const Widget = () => {
  const [address, setAddress] = useState<string | undefined>(undefined)

  return (
    <>
      <SKApp
        apiKey={config.apiKey}
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
            smallButtonBackground: colors.primaryDark,
            smallButtonOutline: colors.primaryDark,

            smallButtonHoverBackground: colors.primaryDarkHover,
            smallButtonHoverOutline: colors.primaryDarkHover,

            smallLightButtonBackground: colors.primaryDark,
            smallLightButtonOutline: colors.primaryDark,

            smallLightButtonHoverBackground: colors.primaryDarkHover,
            smallLightButtonHoverOutline: colors.primaryDarkHover,
          },
          borderRadius: {
            baseContract: {
              "2xl": "5px",
              primaryButton: "5px",
              secondaryButton: "5px",
            },
          },
        }}
        tracking={{
          ...tracking,
          trackEvent: (...args) => {
            const event = args[0]

            switch (event) {
              case "Connected wallet": {
                const address = args[1]?.address as string | undefined

                window.Intercom?.("update", { address })
                setAddress(address)
                return
              }

              case "Widget disconnect clicked": {
                window.Intercom?.("update", { address: undefined })
                setAddress(undefined)

                return
              }

              default:
                break
            }

            tracking?.trackEvent(...args)
          },
        }}
      />

      <Script
        src="/chat.js"
        strategy="afterInteractive"
        onLoad={() =>
          typeof window !== "undefined" &&
          window.Intercom!("boot", {
            api_base: config.intercom.apiBase,
            app_id: config.intercom.appId,
            address,
          })
        }
      />
    </>
  )
}
