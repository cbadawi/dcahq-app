import React, { useCallback } from "react"
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
    (data: DcaData, sourceValue: number, targetValue: number) => {
      const sourceDetails = tokenMap[contractMap[userKey.source as Contract]]
      const source = sourceDetails.displayName
      const targetDetails = tokenMap[contractMap[userKey.target as Contract]]
      const target = sourceDetails.displayName

      setSourcesValues(prevValues => [
        ...prevValues,
        {
          token: source,
          value: sourceValue,
          amount: Number(data.sourceAmountLeft) / 10 ** sourceDetails.decimal
        }
      ])
      setTargetsValues(prevValues => [
        ...prevValues,
        {
          token: target,
          value: targetValue,
          amount: Number(data.targetAmount) / 10 ** targetDetails.decimal
        }
      ])
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

export default PositionStatsContainer
