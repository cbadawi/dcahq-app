import React from "react"
import Image from "next/image"
import { HStack } from "@/styled-system/jsx"
import { css } from "@/styled-system/css"

const SourceTargetImageStack = ({
  sourceImage,
  targetImage
}: {
  sourceImage: string
  targetImage: string
}) => {
  return (
    <HStack position="relative" width="fit-content">
      <Image src={sourceImage} width={20} height={20} alt="token uri" />
      <Image
        src={targetImage}
        width={20}
        height={20}
        className={css({
          position: "absolute",
          top: "0",
          left: "15px"
        })}
        alt="token uri"
      />
    </HStack>
  )
}

export default SourceTargetImageStack
