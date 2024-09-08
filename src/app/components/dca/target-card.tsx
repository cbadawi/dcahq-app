import React, { useEffect, useState } from "react"
import { Box, Flex, VStack } from "@/styled-system/jsx"
import Dropdown from "../dropdown"
import { targetTokens, tokenMap, Tokens } from "@/src/app/common/helpers"
import { css } from "@/styled-system/css"
import { getPrice } from "../../common/functionCalls/getPrice"
import { prettyBalance } from "../../common/prettyCV"
import { StacksMainnet } from "@stacks/network"
import TokenSelector from "../token-selector"

interface TargetComponentProps {
  targetToken: Tokens
  sourceToken: Tokens
  targetPrice: number
  setTargetPrice: (price: number) => void
  sourceValueUsd: number
  network: StacksMainnet | null
  setTargetToken: (token: Tokens) => void
}

const TargetCard: React.FC<TargetComponentProps> = ({
  sourceToken,
  targetToken,
  sourceValueUsd,
  setTargetToken,
  network,
  targetPrice,
  setTargetPrice
}) => {
  const [targetAmount, setTargetAmount] = useState(0)

  useEffect(() => {
    const setAmount = async () => {
      if (!network) return
      const targetPrice = await getPrice(
        tokenMap[targetToken].contract,
        tokenMap[Tokens.sUSDT].contract,
        network
      )
      console.log({ targetPrice })
      setTargetPrice(targetPrice)
    }
    setAmount()
  }, [network, targetToken])

  useEffect(() => {
    if (!network) return
    console.log("target-card setAmount", {
      sourceValueUsd,
      targetPrice,
      targetToken,
      targetAmount: sourceValueUsd / targetPrice
    })
    setTargetAmount(sourceValueUsd / targetPrice)
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
              options={targetTokens.filter(t => t != sourceToken)}
              selectedOption={targetToken}
              onSelect={setTargetToken}
              imagePath={tokenMap[targetToken].image}
            />
          </Box>
          <input
            defaultValue={prettyBalance(targetAmount, 0)}
            placeholder="targetAmount"
            name="target-amount"
            type="text"
            inputMode="decimal"
            className={css({
              marginRight: "0.5rem",
              width: "50%",
              padding: "0.5rem",
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

export default TargetCard
