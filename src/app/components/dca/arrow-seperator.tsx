import React from "react"
import { Box, HStack, VStack } from "styled-system/jsx"
import DownChevron from "../icons/down-chevron"
import { css } from "@/styled-system/css"

const ArrowSeperator = () => {
  return (
    <VStack justifyContent={"center"}>
      <HStack justifyContent={"center"}>
        <Box
          className={css({
            bg: "#15161f"
          })}
        >
          <DownChevron color="grey" hoverColor="red" />
        </Box>
      </HStack>
    </VStack>
  )
}

export default ArrowSeperator
