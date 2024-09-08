"use client"

import React from "react"
import { css } from "styled-system/css"
import { maxJavascriptNumber } from "../common/helpers"
import { setSourcesTargetsConfig } from "../common/functionCalls/config/setSourcesTargetsConfig"
import { UserData } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"

const SetSourcesTargetsConfigButton = ({
  network
}: {
  user: UserData
  network: StacksMainnet
}) => {
  const source = "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.token-wstx-v2"
  const target = "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.token-wcorgi"
  const id = 0
  const feeFixed = (0.5 / 100) * 10 ** 8 // 0.5 %
  const feePercent = 0
  const sourceFactor = 100000000
  const helperFactor = 0
  const isSourceNumerator = true
  const minDcaThreshold = 0
  const maxDcaThreshold = maxJavascriptNumber
  const strategyPrincipal =
    "SP3XZG3JKX58XC3DN1PQGSYJDYMSKM55RM43V6SN.default-strategy"
  const maxSlippage = (4 / 100) * 10 ** 8
  const contractAddress = "SP3XZG3JKX58XC3DN1PQGSYJDYMSKM55RM43V6SN"
  const contractName = "dca-manager"

  return (
    <button
      onClick={() => {
        const respSetSourcesTargetsConfig = setSourcesTargetsConfig(
          source,
          target,
          id,
          feeFixed,
          feePercent,
          sourceFactor,
          helperFactor,
          isSourceNumerator,
          minDcaThreshold,
          maxDcaThreshold,
          strategyPrincipal,
          maxSlippage,
          contractAddress,
          contractName,
          network
        )
        console.log("SetSourcesTargetsConfigButton", {
          respSetSourcesTargetsConfig
        })
      }}
      className={css({
        bg: "red.500",
        _hover: { bg: "red.700" }
      })}
    >
      set sources targets config
    </button>
  )
}

export default SetSourcesTargetsConfigButton
