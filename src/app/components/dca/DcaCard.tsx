"use client"

import React, { useEffect, useState } from "react"
import { Flex, Box, VStack, HStack } from "@/styled-system/jsx"
import { UserData } from "@stacks/connect"
import { useUser } from "@/src/app/contexts/UserProvider"
import ArrowSeperator from "./arrow-seperator"
import SourceComponent from "./source-card"
import TargetComponent from "./target-card"
import {
  Intervals,
  maxUint128,
  sourceTokens,
  Tokens
} from "@/src/app/common/helpers"
import IntervalButton from "./interval-button"
import CreateDcaButton from "../../admin/create-dca-button"
import { StacksMainnet } from "@stacks/network"
import Customize from "./customize"

const DcaCard = () => {
  const { userSession } = useUser()
  const [user, setUser] = useState<UserData | null>(null)
  const [totalAmount, setTotalAmount] = useState("")
  const [purchaseAmount, setPurchaseAmount] = useState("")
  const [minPrice, setMinPrice] = useState(BigInt(0))
  const [maxPrice, setMaxPrice] = useState(maxUint128)
  const [sourceToken, setSourceToken] = useState<Tokens>(Tokens.wSTX)
  const [sourceValueUsd, setSourceValueUsd] = useState(0)
  const [targetToken, setTargetToken] = useState<Tokens>(Tokens.WWELSH)
  const [selectedInterval, setSelectedInterval] = useState<Intervals>(
    Intervals.hours2
  )
  const [network, setNetwork] = useState<StacksMainnet | null>(null)
  const [targetPrice, setTargetPrice] = useState(0)

  useEffect(() => {
    if (!userSession?.isUserSignedIn()) return
    console.log("!!! setting user", userSession?.loadUserData())
    setUser(userSession?.loadUserData())
    const mainnet = new StacksMainnet()
    setNetwork(mainnet)
  }, [])

  return (
    <Flex justifyContent="center">
      <Box
        borderWidth="1px"
        borderRadius="lg"
        p="1rem"
        borderColor={"grey"}
        bg="#15161f"
        width="700px"
        maxWidth="800px"
        margin="auto"
      >
        <Flex pb="0.5rem">
          <Box fontSize="xl" fontWeight="bold">
            From:
          </Box>
        </Flex>
        <Flex direction="column">
          <SourceComponent
            network={network}
            user={user}
            sourceTokens={sourceTokens}
            sourceToken={sourceToken}
            setSourceToken={setSourceToken}
            totalAmount={totalAmount}
            setTotalAmount={setTotalAmount}
            purchaseAmount={purchaseAmount}
            setPurchaseAmount={setPurchaseAmount}
            sourceValueUsd={sourceValueUsd}
            setSourceValueUsd={setSourceValueUsd}
          />
          <Flex width={"100%"} position={"relative"}>
            <HStack pb="0.5rem" position={"absolute"} bottom="0">
              <Box fontSize="xl" fontWeight="bold">
                To:
              </Box>
            </HStack>
            <Flex width={"100%"} justifyContent={"center"}>
              <ArrowSeperator />
            </Flex>
          </Flex>
          <TargetComponent
            sourceToken={sourceToken}
            network={network}
            sourceValueUsd={sourceValueUsd}
            targetToken={targetToken}
            setTargetToken={setTargetToken}
            targetPrice={targetPrice}
            setTargetPrice={setTargetPrice}
          />
          <Flex my={"1rem"}>
            <IntervalButton
              selectedInterval={selectedInterval}
              setSelectedInterval={setSelectedInterval}
            />
          </Flex>
          <CreateDcaButton
            network={network}
            sourceToken={sourceToken}
            targetToken={targetToken}
            interval={selectedInterval}
            totalAmount={totalAmount}
            purchaseAmount={purchaseAmount}
            minPrice={minPrice}
            maxPrice={maxPrice}
          />
          <Customize
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            sourceToken={sourceToken}
            targetToken={targetToken}
            targetToSourcePrice={
              targetPrice / sourceValueUsd / Number(totalAmount)
            }
          />
        </Flex>
      </Box>
    </Flex>
  )
}

export default DcaCard
