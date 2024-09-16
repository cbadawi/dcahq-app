"use client"
import {
  uintCV,
  FungibleConditionCode,
  principalCV,
  createAssetInfo,
  makeContractSTXPostCondition,
  ContractCallOptions,
  Pc,
  PostConditionMode
} from "@stacks/transactions"
import { StacksMainnet } from "@stacks/network"
import {
  contractDeployer,
  dcaManagerName,
  defaultStrategyContract,
  maxUint128,
  tokenMap,
  Tokens
} from "../../helpers"
import { ContractCallRegularOptions, openContractCall } from "@stacks/connect"
import { isStxOrStxWrapper } from "../../filter-tokens"
import { getCreateDcaPostConditions } from "../getPostConditions"

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
  if (setTxId) setTxId("") // reset txid to not have the toaster re-render when a user cancels a second tx
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
  const maxPriceInUnits = BigInt(maxPrice ?? maxUint128) * unit

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

  const postConditions = getCreateDcaPostConditions(
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
    appDetails: {
      name: "DCA-HQ",
      icon: window.location.origin + "/logo.png"
    },
    onFinish: (data: any) => {
      if (setTxId) setTxId(data.txId)
      console.log("Stacks Transaction:", data.stacksTransaction)
      console.log("Transaction ID:", data.txId)
      console.log("Raw transaction:", data.txRaw)
    }
  }

  await openContractCall(txOptions)
}
