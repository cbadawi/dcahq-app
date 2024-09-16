"use client"
import React from "react"
import Image from "next/image"
import { css } from "@/styled-system/css"
import { Box, HStack } from "@/styled-system/jsx"

const Footer = () => {
  return (
    <div
      className={css({
        position: "fixed",
        left: 0,
        bottom: 0,
        width: "100%"
      })}
    >
      <HStack margin={"1rem"} justifyContent="flex-end">
        <Box
          cursor={"pointer"}
          bg={"#1b1b1a"}
          border="1px solid transparent"
          _hover={{ border: "1px solid grey" }}
          padding="0.25rem"
          borderRadius="md"
          onClick={() =>
            window.open(`https://github.com/cbadawi/dhahq-app`, "_blank")
          }
        >
          <Image src={"/github-mark.svg"} width={20} height={20} alt="Github" />
        </Box>
        <Box
          cursor={"pointer"}
          bg={"#1b1b1a"}
          border="1px solid transparent"
          _hover={{ border: "1px solid grey" }}
          borderRadius="md"
          padding="0.4rem"
          onClick={() => window.open(`https://x.com/DCA_HQ`, "_blank")}
        >
          <Image src={"/X-logo.svg"} width={15} height={15} alt="X" />
        </Box>
      </HStack>
    </div>
  )
}

export default Footer
