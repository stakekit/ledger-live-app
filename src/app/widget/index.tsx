"use client"
import "@stakekit/widget/style.css"
import { SKApp, darkTheme } from "@stakekit/widget"
import { config } from "../../config"
import { tracking } from "../tracking"
import Script from "next/script"
import { useState } from "react"

const primary_dark = "#1E1E20"
const primary_dark_hover = "#2f2f32"

const secondary_dark = "#121514"
const secondary_dark_hover = "#282928"

const purple = "#BDB0FF"
const purple_hover = "#D2C9FF"

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
            tabBorder: purple,
            background: primary_dark,
            modalBodyBackground: primary_dark,
            selectValidatorMultiDefaultBackground: primary_dark,
            positionsSectionBackgroundColor: primary_dark,
            positionsSectionBorderColor: primary_dark,

            connectKit: {
              ...darkTheme.color.connectKit,
              modalBackground: primary_dark,
              profileForeground: primary_dark,
            },

            stakeSectionBackground: secondary_dark,
            tokenSelectHoverBackground: secondary_dark_hover,
            backgroundMuted: "#29282A",
            tokenSelectBackground: secondary_dark,
            positionsSectionDividerColor: "#FFFFFF0D",

            skeletonLoaderBase: "#FFFFFF0D",
            skeletonLoaderHighlight: "#2B2B2B",
            dropdownBackground: primary_dark,
            warningBoxBackground: "#FFFFFF0D",

            // Primary Button
            primaryButtonBackground: purple,
            primaryButtonOutline: purple,

            primaryButtonActiveBackground: purple,
            primaryButtonActiveOutline: purple,

            primaryButtonHoverBackground: purple_hover,
            primaryButtonHoverOutline: purple_hover,

            // Secondary Button
            secondaryButtonBackground: secondary_dark,
            secondaryButtonOutline: secondary_dark,

            secondaryButtonActiveBackground: primary_dark,
            secondaryButtonActiveOutline: primary_dark,
            secondaryButtonActiveColor: "#EEF0F2",

            secondaryButtonHoverBackground: secondary_dark_hover,
            secondaryButtonHoverOutline: secondary_dark_hover,
            secondaryButtonHoverColor: "#EEF0F2",

            // Disabled Button
            disabledButtonBackground: "#dfd8ff",
            disabledButtonOutline: "#dfd8ff",
            disabledButtonColor: "#747474",

            // Small Button
            smallButtonBackground: primary_dark,
            smallButtonOutline: primary_dark,

            smallButtonHoverBackground: primary_dark_hover,
            smallButtonHoverOutline: primary_dark_hover,

            smallLightButtonBackground: primary_dark,
            smallLightButtonOutline: primary_dark,

            smallLightButtonHoverBackground: primary_dark_hover,
            smallLightButtonHoverOutline: primary_dark_hover,
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
