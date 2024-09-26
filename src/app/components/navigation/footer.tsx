"use client"
import React from "react"
import Image from "next/image"
import { css } from "@/styled-system/css"
import { Box, HStack } from "@/styled-system/jsx"
import FeedbackIcon from "../icons/feedback"

const Footer = () => {
  return (
    <div
      className={css({
        position: "fixed",
        right: 0,
        bottom: 0
      })}
    >
      <HStack margin={"1rem"} justifyContent="flex-end">
        <Box
          cursor={"pointer"}
          bg={"#1b1b1a"}
          border="1px solid transparent"
          _hover={{ border: "1px solid grey", cursor: "pointer" }}
          padding="0.25rem"
          borderRadius="md"
          onClick={() =>
            window.open(
              `https://github.com/cbadawi/dcahq-app/issues/new`,
              "_blank"
            )
          }
        >
          <FeedbackIcon />
          {/* <Image src={"/github-mark.svg"} width={20} height={20} alt="Github" /> */}
        </Box>
        <Box
          cursor={"pointer"}
          bg={"#1b1b1a"}
          border="1px solid transparent"
          _hover={{ border: "1px solid grey", cursor: "pointer" }}
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
