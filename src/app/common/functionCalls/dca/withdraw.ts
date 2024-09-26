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
import { appDetails } from "../../appDetails"
import { onFinishTx } from "../../tx-handlers"

export const withdraw = async (
  network: StacksMainnet,
  address: string,
  sourceToken: Tokens,
  targetToken: Tokens,
  interval: number,
  dcaStrategy = defaultStrategyContract,
  withdrawAmountString: string,
  setTxId?: React.Dispatch<React.SetStateAction<string>>
) => {
  // reset txid to not have the toaster re-render when a user cancels a second tx
  if (setTxId) setTxId("")
  console.log("setUserDcaData", {
    sourceToken,
    targetToken,
    interval,
    withdrawAmountString,
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
  const withdrawAmount = BigInt(withdrawAmountString) * unit

  const withdrawAmountUintCV = uintCV(withdrawAmount.toString())
  const functionArgs = [
    principalCV(sourceContract),
    principalCV(targetContract),
    uintCV(interval.toString()),
    principalCV(dcaStrategy),
    withdrawAmountUintCV
  ]

  const txOptions: ContractCallOptions | ContractCallRegularOptions = {
    contractAddress: contractDeployer,
    contractName: dcaManagerName,
    functionName: "withdraw",
    functionArgs,
    network,
    postConditions: getPostConditions(targetToken, withdrawAmount, address),
    // postConditionMode: PostConditionMode.Allow,
    appDetails,
    onFinish: (data: any) => {
      if (setTxId) setTxId(data.txId)
      onFinishTx(data)
    }
  }

  await openContractCall(txOptions)
}
