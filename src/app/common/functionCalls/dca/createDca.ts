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
  contractName,
  maxUint128,
  tokenMap,
  Tokens,
  wStxContract
} from "../../helpers"
import { ContractCallRegularOptions, openContractCall } from "@stacks/connect"

export const createDCA = async (
  sourceToken: Tokens,
  targetToken: Tokens,
  interval: number,
  totalAmount: number,
  purchaseAmount: number,
  network: StacksMainnet,
  minPrice?: string,
  maxPrice?: string
) => {
  console.log("CreateDca", {
    sourceToken,
    targetToken,
    interval,
    totalAmount,
    purchaseAmount,
    minPrice,
    maxPrice,
    network
  })

  if (!totalAmount || !purchaseAmount) return

  const sourceContract = tokenMap[sourceToken].contract
  const targetContract = tokenMap[targetToken].contract

  const functionArgs = [
    principalCV(sourceContract),
    principalCV(targetContract),
    uintCV(interval.toString()),
    uintCV(totalAmount.toString()),
    uintCV(purchaseAmount.toString()),
    uintCV(minPrice ?? 0),
    uintCV(maxPrice ?? maxUint128.toString())
    // principalCV(startegyPrincipal)
  ]

  console.log("createDCA functionArgs", { functionArgs })

  const postConditionCode = FungibleConditionCode.GreaterEqual
  const sourceDetails = tokenMap[sourceToken]

  const fungibleAssetInfo = createAssetInfo(
    sourceDetails.contract.split(".")[0],
    sourceDetails.contract.split(".")[1],
    sourceDetails.assetName
  )
  // const postConditions = makeContractFungiblePostCondition(
  //   contractDeployer,
  //   contractName,
  //   postConditionCode,
  //   totalAmount.toString(),
  //   fungibleAssetInfo
  // )

  const postConditions = [
    makeContractSTXPostCondition(
      contractDeployer,
      contractName,
      postConditionCode,
      // in the case of the wstx, the transfer function expect to the pow of 8 but the post condition is displaying the value as a pow of 6
      0 // sourceContract == wStxContract ? totalAmount / 10 ** 2 : totalAmount
    )
  ]

  const txOptions: ContractCallOptions | ContractCallRegularOptions = {
    contractAddress: contractDeployer,
    contractName: contractName,
    functionName: "create-dca",
    functionArgs,
    network,
    postConditions: [
      Pc.principal("SP3XZG3JKX58XC3DN1PQGSYJDYMSKM55RM43V6SN")
        .willSendGte(
          // in the case of the wstx, the transfer function expect to the pow of 8 but the post condition is displaying the value as a pow of 6
          // sourceContract == wStxContract
          // ? totalAmount / 10 ** 2
          // : totalAmount / 10 ** 2
          0
        )
        .ustx()
    ],
    postConditionMode: PostConditionMode.Allow,
    appDetails: {
      name: "Sup",
      icon: window.location.origin + "/logo.png"
    },
    onFinish: (data: any) => {
      console.log("Stacks Transaction:", data.stacksTransaction)
      console.log("Transaction ID:", data.txId)
      console.log("Raw transaction:", data.txRaw)
    }
  }

  await openContractCall(txOptions)
}
