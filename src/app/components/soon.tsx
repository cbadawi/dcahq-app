import { css } from "@/styled-system/css"
import React from "react"

const Soon = () => {
  return (
    <span
      className={css({
        marginLeft: "0.5rem", // add space between the button text and the "soon" tag
        fontSize: "0.75rem", // make it smaller than the Portfolio text
        background: "linear-gradient(90deg, #0F2C74, #431F85)", // darker gradient background
        color: "white", // text color
        padding: "0.2rem 0.5rem", // padding around the text
        borderRadius: "12px", // rounded corners for a pill-shaped look
        fontWeight: "bold", // bold text to stand out
        boxShadow: "0 0 5px rgba(0,0,0,0.2)", // optional: subtle shadow
        transition: "background 0.3s ease, transform 0.3s ease", // smooth hover transition
        cursor: "pointer", // pointer cursor to make it interactive
        _hover: {
          background: "linear-gradient(90deg, #3B60DD, #8846E0)", // brighter gradient on hover
          transform: "scale(1.05)" // slight scale effect on hover
        }
      })}
    >
      Soon
    </span>
  )
}

export default Soon
