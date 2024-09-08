import { css } from "@/styled-system/css"
import React from "react"

const DownChevron = ({
  color,
  hoverColor,
  dimension
}: {
  dimension?: string
  color?: string
  hoverColor?: string
}) => {
  return (
    <div
      className={css({
        "&:hover svg path": {
          stroke: hoverColor
        }
      })}
    >
      <svg
        width={dimension ?? "50px"}
        height={dimension ?? "50px"}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M7 10L12 15L17 10"
          stroke={color ?? "#000000"}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </div>
  )
}

export default DownChevron
