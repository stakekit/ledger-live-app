"use client"

import "@stakekit/widget/package/css"
import { SKApp, darkTheme } from "@stakekit/widget"
import { config } from "../../config"
import mixpanel from "mixpanel-browser"
import { tracking } from "../tracking"
import Script from "next/script"
import { useState } from "react"

typeof window !== "undefined" &&
  config.mixPanelToken &&
  mixpanel.init(config.mixPanelToken)

export const Widget = () => {
  const [address, setAddress] = useState<string | undefined>(undefined)

  return (
    <>
      <SKApp
        apiKey={config.apiKey}
        theme={{
          ...darkTheme,
          color: {
            ...darkTheme.color,
            background: "rgba(0, 0, 0, 0.83)",
            modalBodyBackground: "#121415",
            selectValidatorMultiDefaultBackground: "#121415",
            positionsSectionBackgroundColor: "#121415",
            positionsSectionBorderColor: "#121415",

            connectKit: {
              ...darkTheme.color.connectKit,
              modalBackground: "#121415",
              profileForeground: "#121415",
            },

            secondaryButtonBackground: "#FFFFFF0D",
            secondaryButtonOutline: "#FFFFFF0D",

            secondaryButtonActiveBackground: "#ffffff1a",
            secondaryButtonActiveOutline: "#ffffff1a",
            secondaryButtonActiveColor: "#EEF0F2",

            secondaryButtonHoverBackground: "#ffffff1a",
            secondaryButtonHoverOutline: "#ffffff1a",
            secondaryButtonHoverColor: "#EEF0F2",

            stakeSectionBackground: "#FFFFFF0D",
            backgroundMuted: "#FFFFFF0D",
            tokenSelectBackground: "#FFFFFF0D",
            positionsSectionDividerColor: "#FFFFFF0D",
            tokenSelectHoverBackground: "#ffffff1a",

            skeletonLoaderBase: "#FFFFFF0D",
            skeletonLoaderHighlight: "#2B2B2B",
            dropdownBackground: "#121415",
            warningBoxBackground: "#FFFFFF0D",
          },
        }}
        tracking={{
          ...tracking,
          trackEvent: (...args) => {
            const event = args[0]

            switch (event) {
              case "Connected wallet":
                window.Intercom?.("update", { address: args[1]?.address })
                setAddress(args[1]?.address)
                break

              case "Widget disconnect clicked":
                window.Intercom?.("update", { address: undefined })
                setAddress(undefined)
                break

              default:
                break
            }

            tracking.trackEvent(...args)
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
