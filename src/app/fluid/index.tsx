"use client"

import { useRef } from "react"
import { styles } from "./styles.css"

export const FluidContainer = () => {
  const canvasContainerRef = useRef<HTMLDivElement>(null)

  return <div ref={canvasContainerRef} className={styles} />
}
