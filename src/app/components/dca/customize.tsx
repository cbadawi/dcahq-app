import React, { useState } from "react"
import DownChevron from "../icons/down-chevron"
import { Box, Flex, HStack, VStack } from "@/styled-system/jsx"
import { css } from "@/styled-system/css"
import { prettyPrice } from "../../common/prettyCV"
import { Tokens } from "../../common/helpers"

const Customize = ({
  setMinPrice,
  setMaxPrice,
  targetToSourcePrice,
  sourceToken,
  targetToken
}: {
  setMinPrice: React.Dispatch<React.SetStateAction<bigint>>
  setMaxPrice: React.Dispatch<React.SetStateAction<bigint>>
  targetToSourcePrice: number
  sourceToken: Tokens
  targetToken: Tokens
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [minPriceInput, setMinPriceInput] = useState<string>("")
  const [maxPriceInput, setMaxPriceInput] = useState<string>("")

  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPriceInput(value)
    setMinPrice(BigInt(value || 0))
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPriceInput(value)
    setMaxPrice(BigInt(value || 0))
  }

  return (
    <VStack mt={"1rem"} position="relative">
      <HStack
        onClick={toggleDropdown}
        p="0.5rem"
        border={isDropdownOpen ? "4px solid black" : "4px solid transparent"}
        borderRadius="md"
        _hover={{
          border: "4px solid black",
          cursor: "pointer"
        }}
      >
        <DownChevron dimension="25px" color="grey" />
        <Box fontSize="medium">Customize</Box>
      </HStack>
      {isDropdownOpen && (
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, 15%)"
          zIndex="1"
          bg="#232836"
          borderRadius="md"
          boxShadow="md"
          width="75%"
          mt="0.25rem"
          p="1rem"
          px="2rem"
        >
          <VStack gap="1rem">
            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center" // Optional for vertical centering
              width="100%"
            >
              <label style={{ fontSize: "medium" }}>
                {targetToken}/{sourceToken} price
              </label>
              <input
                className={css({
                  marginRight: "0.5rem",
                  color: "white",
                  fontWeight: "light",
                  fontSize: "medium",
                  textAlign: "right",
                  bg: "transparent"
                })}
                defaultValue={prettyPrice(targetToSourcePrice)}
                type="text"
                inputMode="decimal"
              />
            </Box>
            <HStack justifyContent="space-between" width="100%">
              <label style={{ fontSize: "medium" }}>Minimum Price</label>
              <input
                className={css({
                  marginRight: "0.5rem",
                  color: "white",
                  fontSize: "medium",
                  fontWeight: "light",
                  textAlign: "right",
                  bg: "transparent",
                  px: "2px",
                  border: "1px solid lightgray"
                })}
                value={minPriceInput}
                onChange={handleMinPriceChange}
                placeholder="0"
                type="text"
                inputMode="decimal"
              />
            </HStack>
            <HStack justifyContent="space-between" width="100%">
              <label style={{ fontSize: "medium" }}>Maximum Price</label>
              <input
                className={css({
                  marginRight: "0.5rem",
                  color: "white",
                  fontWeight: "light",
                  fontSize: "medium",
                  textAlign: "right",
                  bg: "transparent",
                  px: "2px",
                  border: "1px solid lightgray"
                })}
                value={maxPriceInput}
                onChange={handleMaxPriceChange}
                placeholder="--"
                type="text"
                inputMode="decimal"
              />
            </HStack>
          </VStack>
        </Box>
      )}
    </VStack>
  )
}

export default Customize
