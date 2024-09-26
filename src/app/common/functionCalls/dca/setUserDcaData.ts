"use client"
import {
  uintCV,
  principalCV,
  ContractCallOptions,
  boolCV
} from "@stacks/transactions"
import { StacksMainnet } from "@stacks/network"
import {
  contractDeployer,
  dcaManagerName,
  defaultStrategyContract,
  maxUint128,
  tokenMap,
  Tokens
} from "../../utils/helpers"
import { ContractCallRegularOptions, openContractCall } from "@stacks/connect"
import { onFinishTx } from "../../tx-handlers"
import { appDetails } from "../../appDetails"

export const setUserDcaData = async (
  network: StacksMainnet,
  sourceToken: Tokens,
  targetToken: Tokens,
  interval: number,
  dcaStrategy = defaultStrategyContract,
  isPaused: boolean,
  buyAmountString: string,
  minPrice?: string,
  maxPrice?: string,
  setTxId?: React.Dispatch<React.SetStateAction<string>>
) => {
  // reset txid to not have the toaster re-render when a user cancels a second tx
  if (setTxId) setTxId("")
  console.log("setUserDcaData", {
    sourceToken,
    targetToken,
    interval,
    buyAmountString,
    isPaused,
    dcaStrategy,
    minPrice,
    maxPrice,
    network
  })

  // right now only time stx can be used on source is when welsh is the target=> use alex. but that should change
  if (sourceToken == Tokens.STX) sourceToken = Tokens.ASTX

  const sourceDetails = tokenMap[sourceToken]

  const sourceDecimal = sourceDetails.decimal
  const sourceContract = sourceDetails.contract
  const targetContract = tokenMap[targetToken].contract

  const unit = BigInt(10 ** sourceDecimal)
  const buyAmount = BigInt(buyAmountString) * unit
  const minPriceInUnits = BigInt(minPrice ?? "0") * unit
  const maxPriceInUnits = BigInt(maxPrice ?? maxUint128) * unit

  const buyAmountUintCV = uintCV(buyAmount.toString())
  const functionArgs = [
    principalCV(sourceContract),
    principalCV(targetContract),
    uintCV(interval.toString()),
    principalCV(dcaStrategy),
    boolCV(isPaused),
    buyAmountUintCV,
    uintCV(minPriceInUnits?.toString()),
    uintCV(maxPriceInUnits?.toString())
  ]

  const txOptions: ContractCallOptions | ContractCallRegularOptions = {
    contractAddress: contractDeployer,
    contractName: dcaManagerName,
    functionName: "set-user-dca-data",
    functionArgs,
    network,
    // postConditions,
    // postConditionMode: PostConditionMode.Allow,
    appDetails,
    onFinish: (data: any) => {
      if (setTxId) setTxId(data.txId)
      onFinishTx(data)
    }
  }

  await openContractCall(txOptions)
}
