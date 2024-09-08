"use client"

import React, { useEffect, useState } from "react"
import { Flex, Box, VStack, HStack } from "@/styled-system/jsx"
import { UserData } from "@stacks/connect"
import { getBalance } from "@/src/app/common/functionCalls/getBalance"
import { sourceTokens, tokenMap, Tokens } from "@/src/app/common/helpers"
import { getPrice } from "../../common/functionCalls/getPrice"
import { prettyBalance, prettyPrice } from "../../common/prettyCV"
import { StacksMainnet } from "@stacks/network"
import InputAmount from "./input-amount"
import TokenSelector from "../token-selector"

interface SourceComponentProps {
  sourceTokens: Tokens[]
  sourceToken: Tokens
  setSourceToken: React.Dispatch<React.SetStateAction<Tokens>>
  sourceValueUsd: number
  setSourceValueUsd: React.Dispatch<React.SetStateAction<number>>
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
  network
}: SourceComponentProps) => {
  const [balance, setBalance] = useState<BigInt>(BigInt(0))

  const sourceTokenContract = tokenMap[sourceToken].contract
  useEffect(() => {
    console.log("!!! getBalance fetching balance")
    async function fetchBalance() {
      console.log("!!! getbalance", { user })
      if (!user || !network) return
      const balance = await getBalance(
        sourceTokenContract,
        user.profile.stxAddress.mainnet,
        network
      )
      setBalance(balance)
    }
    fetchBalance()
  }, [sourceToken, user])

  useEffect(() => {
    if (!totalAmount) return
    async function fetchPrice() {
      if (!network) return
      if (!sourceTokenContract)
        throw Error("Token contract unknown" + sourceToken)
      const price = await getPrice(
        sourceTokenContract,
        tokenMap[Tokens.sUSDT].contract,
        network
      )
      console.log("source-card", {
        totalAmount,
        price,
        sourceTokenContract
      })
      setSourceValueUsd(Number(totalAmount) * price)
    }
    fetchPrice()
  }, [sourceToken.valueOf(), totalAmount])

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
              options={sourceTokens}
              selectedOption={sourceToken}
              onSelect={setSourceToken}
              imagePath={tokenMap[sourceToken].image}
            />
          </Box>
          <InputAmount
            amount={totalAmount}
            setAmount={setTotalAmount}
            name="Total Amount"
          />
          <InputAmount
            amount={purchaseAmount}
            setAmount={setPurchaseAmount}
            name="Amount per Buy"
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
