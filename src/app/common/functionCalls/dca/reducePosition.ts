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
import { getPostConditions } from "../getPostConditions"
import { getAppDetails } from "../../appDetails"
import { onFinishTx } from "../../tx-handlers"

// (define-public (add-to-position (source-trait <ft-trait-b>) (target principal) (interval uint) (strategy principal) (amount uint))
export const reducePosition = async (
  network: StacksMainnet,
  address: string,
  sourceToken: Tokens,
  targetToken: Tokens,
  interval: number,
  dcaStrategy = defaultStrategyContract,
  reduceAmountString: string,
  setTxId?: React.Dispatch<React.SetStateAction<string>>
) => {
  // reset txid to not have the toaster re-render when a user cancels a second tx
  if (setTxId) setTxId("")
  console.log("setUserDcaData", {
    sourceToken,
    targetToken,
    interval,
    reduceAmountString,
    dcaStrategy,
    network
  })

  // right now only time stx can be used on source is when welsh is the target=> use alex. but that should change
  if (sourceToken == Tokens.STX) sourceToken = Tokens.ASTX

  const sourceDetails = tokenMap[sourceToken]

  const sourceDecimal = sourceDetails.decimal
  const sourceContract = sourceDetails.contract
  const targetContract = tokenMap[targetToken].contract

  const unit = BigInt(10 ** sourceDecimal)
  const reduceAmount = BigInt(reduceAmountString) * unit

  const reduceAmountUintCV = uintCV(reduceAmount.toString())
  const functionArgs = [
    principalCV(sourceContract),
    principalCV(targetContract),
    uintCV(interval.toString()),
    principalCV(dcaStrategy),
    reduceAmountUintCV
  ]

  const txOptions: ContractCallOptions | ContractCallRegularOptions = {
    contractAddress: contractDeployer,
    contractName: dcaManagerName,
    functionName: "reduce-position",
    functionArgs,
    network,
    postConditions: getPostConditions(sourceToken, reduceAmount, address),
    // postConditionMode: PostConditionMode.Allow,
    appDetails: getAppDetails(),
    onFinish: (data: any) => {
      if (setTxId) setTxId(data.txId)
      onFinishTx(data)
    }
  }

  await openContractCall(txOptions)
}
