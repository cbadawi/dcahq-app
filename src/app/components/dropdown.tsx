import React, { useEffect, useRef, useState } from "react"
import { Box } from "styled-system/jsx"
import { tokenMap, Tokens } from "../common/utils/helpers"

interface DropdownProps<T> {
  options: T[]
  onSelect: (option: T) => void
  isDropdownOpen: boolean
  setIsDropdownOpen: React.Dispatch<React.SetStateAction<boolean>>
  displayHandler: (option: T) => string
}

const Dropdown = <T,>({
  options,
  onSelect,
  isDropdownOpen,
  setIsDropdownOpen,
  displayHandler
}: DropdownProps<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null)
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

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside)
    document.addEventListener("keydown", handleKeyDown)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [])

  if (!isDropdownOpen) return null
  return (
    <Box
      ref={dropdownRef}
      position="absolute"
      top="100%"
      left="0"
      zIndex="1"
      bg="#29303F"
      borderRadius="md"
      boxShadow="md"
      width="100%"
      mt="0.25rem" // Reduced margin for smaller spacing
    >
      {options.map((option, index) => (
        <Box
          key={`${option} + ${index}`}
          onClick={() => {
            onSelect(option)
            setIsDropdownOpen(false)
          }}
          cursor="pointer"
          p="0.5rem"
          fontSize="sm"
          _hover={{ bg: "#1a1b26", color: "orange" }}
        >
          {displayHandler(option)}
        </Box>
      ))}
    </Box>
  )
}

export default Dropdown
