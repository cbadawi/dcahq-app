import React, { useEffect, useRef } from "react"
import { Box, Flex, VStack } from "@/styled-system/jsx"
import { css } from "@/styled-system/css"

const Modal = ({
  isVisible,
  setIsVisible,
  onClose,
  children
}: {
  isVisible: boolean
  setIsVisible: (b: boolean) => void
  onClose: () => void
  children: React.ReactNode
}) => {
  const modalRef = useRef<HTMLDivElement>(null)

  const handleClickOutside = (event: MouseEvent) => {
    if (modalRef?.current && !modalRef.current.contains(event.target as Node)) {
      setIsVisible(false)
    }
  }

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      setIsVisible(false)
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

  if (!isVisible) return null

  return (
    <Flex
      position="fixed"
      top="0"
      left="0"
      width="100vw"
      height="100vh"
      alignItems="center"
      justifyContent="center"
      bg="rgba(0, 0, 0, 0.7)"
      // bg="#29303F"
      zIndex="1000"
    >
      <VStack
        ref={modalRef}
        // bg="white"
        bg="#29303F"
        p="2rem"
        borderRadius="8px"
        boxShadow="0 4px 6px rgba(0, 0, 0, 0.1)"
        width="20rem"
        textAlign="center"
      >
        {children}
        <button onClick={onClose} className={css({ marginTop: "1rem" })}>
          Close
        </button>
      </VStack>
    </Flex>
  )
}

export default Modal
