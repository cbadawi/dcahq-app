import React, { ReactNode } from "react"
import { css } from "@/styled-system/css"

const HeaderBanner = ({ children }: { children: ReactNode }) => {
  return (
    <span
      className={css({
        display: "inline-block",
        fontSize: ["1rem", "1.25rem", "1.5rem"],
        fontWeight: "bold",
        lineHeight: "1.4",
        textAlign: "center",
        position: "relative",
        background: "linear-gradient(to bottom, orange, white)",
        backgroundClip: "text",
        color: "transparent"
      })}
      style={{
        WebkitBackgroundClip: "text",
        WebkitTextFillColor: "transparent"
      }}
    >
      {children}
    </span>
  )
}

export default HeaderBanner
