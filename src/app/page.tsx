import React from "react"
import { Header } from "./header"
import { Widget } from "./widget"
import { HelpModals } from "./widget/help-modals"
import { Box } from "../components/atoms/box"
import { container } from "./style.css"

export default function Home() {
  return (
    <Box className={container}>
      <Header />
      <Widget />
      <Box marginTop={{ tablet: "0", mobile: "8" }}>
        <HelpModals />
      </Box>
    </Box>
  )
}
