import React, { memo, useEffect, useState } from "react"
import { Box, Flex, VStack } from "@/styled-system/jsx"
import { tokenMap, Tokens } from "@/src/app/common/utils/helpers"
import { css } from "@/styled-system/css"
import { getPrice, getPriceUsd } from "../../common/functionCalls/getPrice"
import { prettyBalance } from "../../common/utils/pretty"
import { StacksMainnet } from "@stacks/network"
import TokenSelector from "../token-selector"

interface TargetComponentProps {
  targetToken: Tokens
  targetTokens: Tokens[]
  sourceToken: Tokens
  stxPrice: number
  targetPrice: number
  setTargetPrice: (price: number) => void
  sourceValueUsd: number
  network: StacksMainnet
  setTargetToken: (token: Tokens) => void
}

const TargetCard: React.FC<TargetComponentProps> = ({
  sourceToken,
  targetToken,
  targetTokens,
  sourceValueUsd,
  setTargetToken,
  network,
  targetPrice,
  setTargetPrice,
  stxPrice
}) => {
  const [targetAmount, setTargetAmount] = useState(0)

  useEffect(() => {
    let active = true
    if (!stxPrice) return
    const setAmount = async () => {
      const priceUsd = await getPriceUsd(targetToken, network, stxPrice)
      console.log("target-card getPriceUsd", {
        priceUsd,
        targetToken,
        stxPrice
      })
      if (!active) return
      setTargetPrice(priceUsd)
    }
    setAmount()
    return () => {
      active = false
    }
  }, [targetToken, stxPrice])

  useEffect(() => {
    const amount = sourceValueUsd / targetPrice
    console.log("target-card setAmount", {
      sourceValueUsd,
      targetPriceUsd: targetPrice,
      targetToken,
      targetAmount: amount
    })
    setTargetAmount(amount)
  }, [network, targetToken, sourceValueUsd, targetPrice])

  return (
    <Box
      display="block"
      bg="#111319"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={"grey"}
    >
      <VStack width="100%">
        <Flex alignItems="center" width="100%">
          <Box m={"1rem"}>
            <TokenSelector
              options={targetTokens}
              selectedOption={targetToken}
              onSelect={setTargetToken}
              imagePath={tokenMap[targetToken].image}
            />
          </Box>
          <input
            value={prettyBalance(targetAmount, 0)}
            readOnly={true}
            placeholder="targetAmount"
            name="target-amount"
            type="text"
            inputMode="decimal"
            className={css({
              marginRight: "0.5rem",
              width: "50%",
              padding: ["0", "0.5rem"],
              color: "grey",
              fontWeight: "light",
              textAlign: "right",
              bg: "transparent",
              border: "none",
              outline: "none"
            })}
          />
        </Flex>
      </VStack>
    </Box>
  )
}

export default memo(TargetCard)
