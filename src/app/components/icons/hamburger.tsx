import { css } from "@/styled-system/css"
import React from "react"

interface HamburgerIconProps {
  size?: number
  primaryColor?: string // For the first gradient color
  secondaryColor?: string // For the second gradient color
  onClick?: () => void
  className?: string
}

const HamburgerIcon: React.FC<HamburgerIconProps> = ({
  size = 30,
  primaryColor = "white",
  secondaryColor = "orange",
  onClick
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      x="0px"
      y="0px"
      width={size}
      height={size}
      viewBox="0 0 64 64"
      onClick={onClick}
      className={css({
        cursor: "pointer",
        transition: "transform 0.3s ease, width 0.3s ease, height 0.3s ease",
        "&:hover": {
          transform: "rotate(90deg)"
        }
      })}
    >
      <defs>
        <linearGradient
          id="grad1"
          x1="32"
          x2="32"
          y1="5.333"
          y2="59.867"
          gradientUnits="userSpaceOnUse"
          spreadMethod="reflect"
        >
          <stop offset="0" stopColor={primaryColor}></stop>
          <stop offset="1" stopColor={secondaryColor}></stop>
        </linearGradient>
      </defs>

      <circle
        cx="32"
        cy="32"
        r="26"
        stroke="url(#grad1)"
        strokeWidth="4"
        fill="none"
      />

      <rect x="20" y="22" width="24" height="2" fill="url(#grad1)" />
      <rect x="20" y="30" width="24" height="2" fill="url(#grad1)" />
      <rect x="20" y="38" width="24" height="2" fill="url(#grad1)" />
    </svg>
  )
}

export default HamburgerIcon
