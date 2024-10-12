import React from "react"
import { css } from "@/styled-system/css"
import PortfolioStats from "./portfolio-stats"

const Portfolio = () => {
  return (
    <div>
      <div
        className={css({
          margin: "2rem"
        })}
      >
        <div
          className={css({
            marginBottom: "2rem"
          })}
        >
          <span
            className={css({
              fontSize: "2rem",
              fontWeight: "bold"
            })}
          >
            Your Positions
          </span>
        </div>
        <PortfolioStats />
      </div>
    </div>
  )
}

export default Portfolio
