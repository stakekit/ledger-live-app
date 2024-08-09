"use client"

import "@stakekit/widget/style.css"
import { SKApp, darkTheme } from "@stakekit/widget"
import { config } from "../../config"
import { tracking } from "../tracking"
import Script from "next/script"
import { useState } from "react"

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
            tabBorder: "#BDB0FF",
            background: "#1E1E20",
            modalBodyBackground: "#121415",
            selectValidatorMultiDefaultBackground: "#121415",
            positionsSectionBackgroundColor: "#121415",
            positionsSectionBorderColor: "#121415",

            connectKit: {
              ...darkTheme.color.connectKit,
              modalBackground: "#121415",
              profileForeground: "#121415",
            },

            stakeSectionBackground: "#121514",
            backgroundMuted: "#29282A",
            tokenSelectBackground: "#FFFFFF0D",
            positionsSectionDividerColor: "#FFFFFF0D",
            tokenSelectHoverBackground: "#ffffff1a",

            skeletonLoaderBase: "#FFFFFF0D",
            skeletonLoaderHighlight: "#2B2B2B",
            dropdownBackground: "#121415",
            warningBoxBackground: "#FFFFFF0D",

            // Primary Button
            primaryButtonBackground: "#BDB0FF",
            primaryButtonOutline: "#BDB0FF",

            primaryButtonActiveBackground: "#BDB0FF",
            primaryButtonActiveOutline: "#BDB0FF",

            primaryButtonHoverBackground: "#a999fa",
            primaryButtonHoverOutline: "#a999fa",

            // Secondary Button
            secondaryButtonBackground: "#FFFFFF0D",
            secondaryButtonOutline: "#FFFFFF0D",

            secondaryButtonActiveBackground: "#ffffff1a",
            secondaryButtonActiveOutline: "#ffffff1a",
            secondaryButtonActiveColor: "#EEF0F2",

            secondaryButtonHoverBackground: "#ffffff1a",
            secondaryButtonHoverOutline: "#ffffff1a",
            secondaryButtonHoverColor: "#EEF0F2",

            // Disabled Button
            disabledButtonBackground: "#dfd8ff",
            disabledButtonOutline: "#dfd8ff",
            disabledButtonColor: "#747474",

            // Small Button
            smallButtonBackground: "#1E1E20",
            smallButtonOutline: "#1E1E20",

            smallButtonHoverBackground: "#212123",
            smallButtonHoverOutline: "#212123",

            smallLightButtonBackground: "#1E1E20",
            smallLightButtonOutline: "#1E1E20",

            smallLightButtonHoverBackground: "#212123",
            smallLightButtonHoverOutline: "#212123",
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
