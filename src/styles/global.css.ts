import { globalStyle } from "@vanilla-extract/css"
import { maxMediaQuery } from "./tokens/breakpoints"

globalStyle("html, body", {
  margin: 0,
})

globalStyle("body", {
  background: "#121415",
  fontFamily: "var(--sk-font-garamond)",
  minHeight: "100vh",
})

globalStyle("a", {
  textDecoration: "none",
})

globalStyle("[data-rk='stakekit']", {
  "@media": {
    [maxMediaQuery("tablet")]: {
      padding: "0 8px",
    },
  },
})

globalStyle("[data-rk='stakekit'] > div:first-of-type", {
  borderRadius: "4px",
})

globalStyle("[data-rk='chain-modal-container']", {
  border: "#2E2E31 solid 1px",
  backgroundColor: "transparent",
})

globalStyle("[data-rk='chain-modal-container'] > button", {
  paddingRight: "8px",
})

globalStyle("[data-rk='account-modal-container']", {
  border: "#2E2E31 solid 1px",
  borderRadius: "5px",
  backgroundColor: "transparent ",
})

globalStyle("[data-rk='account-modal-container'] > button", {
  paddingRight: "8px",
})

// X-icon button border
globalStyle("[data-rk='select-validator-trigger']", {
  borderRadius: "3px",
})

// X-icon color
globalStyle("[data-rk='select-validator-trigger'] > button > svg > path", {
  stroke: "#BDB0FF",
})

// + icon button border
globalStyle("[data-rk='select-validator-plus']", {
  borderRadius: "3px",
})

// + icon color
globalStyle("[data-rk='select-validator-plus'] > svg > path", {
  stroke: "#BDB0FF",
})

globalStyle("[data-rk='select-validator-trigger-container']", {
  gap: "8px",
})

globalStyle("[data-rk='stake-token-section-max-button']", {
  borderRadius: "3px",
  border: "1px solid #505254",
  textTransform: "uppercase",
  backgroundColor: "transparent",
})

globalStyle("[data-rk='stake-token-section-max-button'] > p", {
  fontSize: "10px",
  color: "var(--sk-color-text-muted)",
})
