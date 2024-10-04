import { css } from "@/styled-system/css"
import React from "react"

const Soon = () => {
  return (
    <span
      className={css({
        marginLeft: "0.5rem",
        display: "flex",
        justifyContent: "center",
        fontSize: "0.75rem",
        background: "linear-gradient(90deg, #0F2C74, #431F85)",
        color: "white",
        padding: "0.2rem 0.5rem",
        borderRadius: "12px",
        fontWeight: "bold",
        boxShadow: "0 0 5px rgba(0,0,0,0.2)",
        transition: "background 0.3s ease, transform 0.3s ease",
        cursor: "pointer",
        _hover: {
          background: "linear-gradient(90deg, #3B60DD, #8846E0)",
          transform: "scale(1.05)"
        }
      })}
    >
      Soon
    </span>
  )
}

export default Soon
