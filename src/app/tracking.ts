import { SKAppProps } from "@stakekit/widget"
import mixpanel from "mixpanel-browser"
import { config } from "../config"

export const mixpanelEnabled =
  typeof window !== "undefined" && config.mixPanelToken

if (mixpanelEnabled) {
  mixpanel.init(config.mixPanelToken)
}

export const tracking: NonNullable<SKAppProps["tracking"]> = {
  trackEvent: (...args) => {
    if (!mixpanelEnabled) return

    mixpanel.track(...args)
  },
  trackPageView: (page, props) => {
    if (!mixpanelEnabled) return

    mixpanel.track_pageview({ page, ...(props && { props }) })
  },
}
