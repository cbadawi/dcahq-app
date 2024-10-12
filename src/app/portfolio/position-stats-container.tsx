import React, { memo, useCallback } from "react"
import {
  Contract,
  contractMap,
  DcaData,
  tokenMap,
  UserKey,
  ValuePieChartData
} from "../common/utils/helpers"
import PositionStats from "./position-stats"
import { StacksMainnet } from "@stacks/network"
import { isSourceANumerator } from "../common/utils/isSourceANumerator"

type value = {
  token: string
  value: number
  amount: string | number
}

function addIfNotExists(
  prevValues: value[],
  token: string,
  value: number,
  amount: string | number
): value[] {
  const exists = prevValues.some(
    item =>
      item.token === token && item.value === value && item.amount === amount
  )

  if (!exists) {
    const newObject: value = {
      token,
      value,
      amount
    }

    return [...prevValues, newObject]
  }

  return prevValues
}

const PositionStatsContainer = ({
  userKey,
  network,
  address,
  setSourcesValues,
  setTargetsValues
}: {
  userKey: UserKey
  address: string
  network: StacksMainnet
  setSourcesValues: React.Dispatch<React.SetStateAction<ValuePieChartData[]>>
  setTargetsValues: React.Dispatch<React.SetStateAction<ValuePieChartData[]>>
}) => {
  const onDcaDataFetching = useCallback(
    (
      data: DcaData,
      sourceUnitPriceInSTX: number,
      targetUnitPriceInSTX: number
    ) => {
      const sourceToken = contractMap[userKey.source as Contract]
      const targetToken = contractMap[userKey.target as Contract]
      const sourceDetails = tokenMap[sourceToken]
      const source = sourceDetails.displayName
      const targetDetails = tokenMap[targetToken]
      const target = sourceDetails.displayName

      const sourceAmountInDec =
        Number(data.sourceAmountLeft) / 10 ** sourceDetails.decimal
      const targetAmountInDec =
        Number(data.targetAmount) / 10 ** targetDetails.decimal

      const sourceValue = isSourceANumerator(sourceToken, targetToken)
        ? sourceAmountInDec * sourceUnitPriceInSTX
        : sourceAmountInDec / sourceUnitPriceInSTX
      const targetValue = isSourceANumerator(sourceToken, targetToken)
        ? targetAmountInDec * targetUnitPriceInSTX
        : targetAmountInDec / targetUnitPriceInSTX

      console.log("onDcaDataFetching", {
        source,
        sourceUnitPriceInSTX,
        sourceAmountInDec,
        sourceValue,
        target,
        targetUnitPriceInSTX,
        targetAmountInDec,
        targetValue
      })

      setSourcesValues(prevValues =>
        addIfNotExists(prevValues, source, sourceValue, sourceAmountInDec)
      )
      setTargetsValues(prevValues =>
        addIfNotExists(prevValues, target, targetValue, targetAmountInDec)
      )
    },
    []
  )

  return (
    <PositionStats
      userKey={userKey}
      address={address}
      network={network}
      onDcaDataFetching={onDcaDataFetching}
    />
  )
}

export default memo(PositionStatsContainer)
