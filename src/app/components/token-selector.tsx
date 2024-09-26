import React, { useState } from "react"
import { Box, Flex, HStack } from "styled-system/jsx"
import DownChevron from "./icons/down-chevron"
import Image from "next/image"
import Dropdown from "./dropdown"
import { tokenMap, Tokens } from "../common/utils/helpers"

interface TokenSelectorProps {
  options: Tokens[]
  selectedOption: Tokens
  onSelect: (option: any) => void
  imagePath?: string
}

const TokenSelector: React.FC<TokenSelectorProps> = ({
  options,
  selectedOption,
  onSelect,
  imagePath
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)
  const toggleDropdown = () => setIsDropdownOpen(!isDropdownOpen)
  return (
    <Box position={"relative"}>
      <Flex
        onClick={toggleDropdown}
        justifyContent="space-between"
        alignItems="center"
        cursor="pointer"
        color="white"
        fontWeight="light"
        bg="#1a1a20"
        borderRadius="md"
        fontSize="sm"
        width="8rem"
        _hover={{ color: "gray.300" }}
      >
        <HStack
          whiteSpace="nowrap"
          overflow="hidden"
          textOverflow="ellipsis"
          px="0.2rem"
          py="0.1rem"
          fontWeight="bold"
        >
          {!!imagePath && (
            <Image src={imagePath} width={20} height={20} alt="token uri" />
          )}

          {tokenMap[selectedOption].displayName}
        </HStack>
        <DownChevron dimension="35px" color="white" />
      </Flex>

      <Dropdown
        options={options}
        onSelect={onSelect}
        isDropdownOpen={isDropdownOpen}
        setIsDropdownOpen={setIsDropdownOpen}
      />
    </Box>
  )
}

export default TokenSelector
