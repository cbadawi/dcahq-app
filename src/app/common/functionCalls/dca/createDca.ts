"use client"
import { uintCV, principalCV, ContractCallOptions } from "@stacks/transactions"
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
import { getPostConditions } from "../getPostConditions"
import { onFinishTx } from "../../tx-handlers"
import { getAppDetails } from "../../appDetails"

export const createDCA = async (
  sourceToken: Tokens,
  targetToken: Tokens,
  interval: number,
  totalAmountString: string,
  purchaseAmountString: string,
  network: StacksMainnet,
  userAddress: string,
  minPrice?: string,
  maxPrice?: string,
  setTxId?: React.Dispatch<React.SetStateAction<string>>
) => {
  // reset txid to not have the toaster re-render when a user cancels a second tx
  if (setTxId) setTxId("")
  console.log("CreateDca", {
    sourceToken,
    targetToken,
    interval,
    totalAmountString,
    purchaseAmountString,
    minPrice,
    maxPrice,
    network
  })

  if (!totalAmountString || !purchaseAmountString) return
  // right now only time stx can be used on source is when welsh is the target=> use alex. but that should change
  if (sourceToken == Tokens.STX) sourceToken = Tokens.ASTX

  const sourceDetails = tokenMap[sourceToken]

  const sourceDecimal = sourceDetails.decimal
  const sourceContract = sourceDetails.contract
  const targetContract = tokenMap[targetToken].contract

  const unit = BigInt(10 ** sourceDecimal)
  const totalAmount = BigInt(totalAmountString) * unit
  const purchaseAmount = BigInt(purchaseAmountString) * unit
  const minPriceInUnits = BigInt(minPrice ?? "0") * unit
  const maxPriceInUnits =
    maxPrice && maxPrice != maxUint128.toString()
      ? BigInt(maxPrice) * unit
      : maxUint128

  const totalAmountUintCV = uintCV(totalAmount.toString())
  const functionArgs = [
    principalCV(sourceContract),
    principalCV(targetContract),
    uintCV(interval.toString()),
    totalAmountUintCV,
    uintCV(purchaseAmount.toString()),
    uintCV(minPriceInUnits?.toString()),
    uintCV(maxPriceInUnits?.toString()),
    principalCV(defaultStrategyContract)
  ]

  const postConditions = getPostConditions(
    sourceToken,
    totalAmount,
    userAddress
  )

  const txOptions: ContractCallOptions | ContractCallRegularOptions = {
    contractAddress: contractDeployer,
    contractName: dcaManagerName,
    functionName: "create-dca",
    functionArgs,
    network,
    postConditions,
    // postConditionMode: PostConditionMode.Allow,
    appDetails: getAppDetails(),
    onFinish: (data: any) => {
      if (setTxId) setTxId(data.txId)
      onFinishTx(data)
    }
  }
  await openContractCall(txOptions)
}
