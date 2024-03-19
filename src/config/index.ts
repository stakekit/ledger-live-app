export const config = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY ?? "",
  mixPanelToken: process.env.NEXT_PUBLIC_MIX_PANEL_TOKEN ?? "",
  intercom: { apiBase: "https://api-iam.intercom.io", appId: "k65tds23" },
} as const
