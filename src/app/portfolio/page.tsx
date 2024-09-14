import { Box, HStack, VStack } from "@/styled-system/jsx"
import React from "react"
import PieChart from "../components/charts/pie-chart"
import { css } from "@/styled-system/css"

const Portfolio = () => {
  // source & target value pie chart
  // cards per dca position with amounts, ETA
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
            Portfolio
          </span>
        </div>
        <HStack>
          <PieChart />
          <PieChart />
        </HStack>
        <VStack>
          <Box></Box>
        </VStack>
        <VStack height="100vh" justifyContent="center">
          <span>It looks like you dont have any DCA positions.</span>
          <span>Here are the benefits of DCA :</span>
          <span>
            - Powered by bitcoin, decentralized & non-custodial, withraw
            anytime.
          </span>
          <span>- Near zero fees, you just cover the transaction costs.</span>
          <span>
            - Better execution price. Cuts down your big swaps into smaller
            ones.
          </span>
          <span>- Reduces market downturn risk. Better average entry.</span>
        </VStack>
      </div>
    </div>
  )
}

export default Portfolio
