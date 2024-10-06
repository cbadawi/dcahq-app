import React from "react"
import { css } from "@/styled-system/css"
import { VStack } from "@/styled-system/jsx"

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
              marginBottom: "2rem",
              fontWeight: "bold"
            })}
          >
            Swap Strategies
          </span>
        </div>
        <VStack
          justifyContent="center"
          className={css({
            backgroundImage: "url('/dashboard.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            height: "70vh",
            padding: "2rem",
            overflow: "scroll"
          })}
        >
          <div className={css({ overflow: "scroll" })}>
            <span
              className={css({
                fontSize: ["lg", "x-large"],
                fontWeight: "bold",
                marginBottom: "1rem",
                display: "block",
                color: "#fff"
              })}
            >
              <p>🚧 Under Construction 🚧</p>
              <p>We&apos;re building something amazing 🏗️ Check back soon!</p>
            </span>
            <ul
              className={css({ paddingLeft: "0", listStylePosition: "inside" })}
            >
              <li
                className={css({
                  fontSize: ["md", "lg"],
                  marginBottom: "0.5rem",
                  color: "#fff" // Optional: Adjust text color for contrast
                })}
              >
                <span
                  className={css({
                    fontWeight: "bold"
                  })}
                >
                  - Optimized Execution:
                </span>{" "}
                Custom assets & allocation strategies with algorithmic &
                weighted swaps.
              </li>
              <li
                className={css({
                  fontSize: ["md", "lg"],
                  marginBottom: "0.5rem",
                  color: "#fff"
                })}
              >
                <span
                  className={css({
                    fontWeight: "bold"
                  })}
                >
                  - [redacted]
                </span>{" "}
                first of its kind in web3, bringing modern financial instruments
                to crypto.
              </li>
            </ul>
          </div>
        </VStack>
      </div>
    </div>
  )
}

export default Portfolio
