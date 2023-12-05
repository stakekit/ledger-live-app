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
        theme={darkTheme}
        connectKitForceTheme="darkMode"
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
