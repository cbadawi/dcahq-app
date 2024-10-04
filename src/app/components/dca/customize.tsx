import React, { useEffect, useRef, useState } from "react"
import DownChevron from "../icons/down-chevron"
import { Box, Flex, HStack, VStack } from "@/styled-system/jsx"
import { css } from "@/styled-system/css"
import { prettyPrice } from "../../common/utils/pretty"
import { tokenMap, Tokens } from "../../common/utils/helpers"
import {
  getPriceRatioDisplay,
  isSourceANumerator
} from "../../common/utils/isSourceANumerator"

const Customize = ({
  setMinPrice,
  setMaxPrice,
  targetToSourcePrice,
  sourceToken,
  targetToken
}: {
  setMinPrice: React.Dispatch<React.SetStateAction<string>>
  setMaxPrice: React.Dispatch<React.SetStateAction<string>>
  targetToSourcePrice: number
  sourceToken: Tokens
  targetToken: Tokens
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const [minPriceInput, setMinPriceInput] = useState<string>("")
  const [maxPriceInput, setMaxPriceInput] = useState<string>("")
  const dropdownRef = useRef<HTMLDivElement>(null)

  // commenting out the mousedown for down as it closes the customize dropdown when a user clicks the dca button and doesnt initiate DCA
  useEffect(() => {
    // document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      // document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  const handleClickOutside = (event: MouseEvent) => {
    if (
      dropdownRef?.current &&
      !dropdownRef.current.contains(event.target as Node)
    ) {
      setIsDropdownOpen(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsDropdownOpen(false)
    }
  }
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen)
  }

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMinPriceInput(value)
    setMinPrice(value)
  }

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setMaxPriceInput(value)
    setMaxPrice(value)
  }

  const relativePrice = isSourceANumerator(sourceToken, targetToken)
    ? 1 / targetToSourcePrice
    : targetToSourcePrice

  console.log({
    targetToSourcePrice,
    issourcenumerator: isSourceANumerator(sourceToken, targetToken)
  })

  return (
    <VStack mt={"1rem"} position="relative" ref={dropdownRef}>
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
              alignItems="center"
              width="100%"
            >
              <label style={{ fontSize: "medium" }}>
                {getPriceRatioDisplay(sourceToken, targetToken)}
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
                value={prettyPrice(relativePrice)}
                type="text"
                inputMode="decimal"
                readOnly={true}
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
