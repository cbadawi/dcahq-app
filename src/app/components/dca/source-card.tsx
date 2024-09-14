"use client"

import React, { useEffect, useState } from "react"
import { Flex, Box, VStack, HStack } from "@/styled-system/jsx"
import { UserData } from "@stacks/connect"
import { getBalance } from "@/src/app/common/functionCalls/getBalance"
import {
  sourceTokens,
  targetTokens,
  tokenMap,
  Tokens
} from "@/src/app/common/helpers"
import { prettyBalance, prettyPrice } from "../../common/prettyCV"
import { StacksMainnet } from "@stacks/network"
import InputAmount from "./input-amount"
import TokenSelector from "../token-selector"
import {
  getPrice,
  getPriceParams,
  getPriceUsd
} from "../../common/functionCalls/getPrice"
import {
  getAvailableSourceTokens,
  getAvailableTargetTokens
} from "../../common/filter-tokens"

interface SourceComponentProps {
  sourceToken: Tokens
  setSourceToken: React.Dispatch<React.SetStateAction<Tokens>>
  setTargetToken: React.Dispatch<React.SetStateAction<Tokens>>
  setTargetTokens: React.Dispatch<React.SetStateAction<Tokens[]>>
  sourceValueUsd: number
  setSourceValueUsd: React.Dispatch<React.SetStateAction<number>>
  stxPrice: number
  totalAmount: string
  setTotalAmount: (amount: string) => void
  purchaseAmount: string
  setPurchaseAmount: (amount: string) => void
  user: UserData | null
  network: StacksMainnet | null
}

const SourceCard = ({
  user,
  sourceToken,
  setSourceToken,
  totalAmount,
  setTotalAmount,
  purchaseAmount,
  setPurchaseAmount,
  sourceValueUsd,
  setSourceValueUsd,
  network,
  setTargetTokens,
  setTargetToken,
  stxPrice
}: SourceComponentProps) => {
  const [balance, setBalance] = useState<BigInt>(BigInt(0))

  useEffect(() => {
    async function fetchBalance() {
      if (!user || !network) return
      const balance = await getBalance(
        sourceToken,
        user.profile.stxAddress.mainnet,
        network
      )
      setBalance(balance)
    }
    fetchBalance()
    const newTargetTokens = getAvailableTargetTokens(targetTokens, sourceToken)
    setTargetToken(newTargetTokens[0])
    setTargetTokens(newTargetTokens)
  }, [sourceToken.valueOf(), user])

  useEffect(() => {
    if (!totalAmount) return
    async function fetchPrice() {
      if (!network) return
      const priceUsd = await getPriceUsd(sourceToken, network, stxPrice)
      console.log("source-card", {
        stxPrice,
        totalAmount,
        priceUsd,
        sourceToken
      })
      setSourceValueUsd(Number(totalAmount) * priceUsd)
    }
    fetchPrice()
  }, [sourceToken.valueOf(), totalAmount, stxPrice])

  return (
    <Box
      display="block"
      bg="#0e0e13"
      borderWidth="1px"
      borderRadius="lg"
      borderColor={"grey"}
    >
      <VStack width="100%">
        <Flex
          justifyContent="space-between"
          alignItems="center"
          width="100%"
          gap={"1.5rem"}
        >
          <Box m={"1rem"}>
            <TokenSelector
              options={getAvailableSourceTokens(sourceTokens)}
              selectedOption={sourceToken}
              onSelect={setSourceToken}
              imagePath={tokenMap[sourceToken].image}
            />
          </Box>
          <InputAmount
            amount={purchaseAmount}
            setAmount={setPurchaseAmount}
            name="Amount per Buy"
          />
          <InputAmount
            amount={totalAmount}
            setAmount={setTotalAmount}
            name="Total Amount"
          />
        </Flex>
        <HStack width="100%">
          <Flex
            justifyContent="space-between"
            width="100%"
            color={"grey"}
            mx="1rem"
            fontFamily={"sans-serif"}
            fontSize={"medium"}
          >
            <span>Balance: {prettyBalance(balance)}</span>
            <span>≈ ${prettyPrice(sourceValueUsd)}</span>
          </Flex>
        </HStack>
      </VStack>
    </Box>
  )
}

export default SourceCard
