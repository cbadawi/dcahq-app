import { StacksMainnet } from "@stacks/network"
import {
  callReadOnlyFunction,
  cvToValue,
  principalCV,
  ReadOnlyFunctionOptions
} from "@stacks/transactions"

export async function getBalance(
  tokenTrait: string,
  address: string,
  network: StacksMainnet
) {
  const functionArgs = [principalCV(address)]
  const options: ReadOnlyFunctionOptions = {
    contractAddress: tokenTrait.split(".")[0],
    contractName: tokenTrait.split(".")[1],
    functionName: "get-balance",
    functionArgs,
    network,
    senderAddress: address
  }
  const response = await callReadOnlyFunction(options)
  console.log("getBalance ", { response })
  // @ts-ignore
  const balanceCV = response.value
  const balance = cvToValue(balanceCV)
  return balance
}
