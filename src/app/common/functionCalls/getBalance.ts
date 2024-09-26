import { StacksMainnet } from "@stacks/network"
import {
  callReadOnlyFunction,
  cvToValue,
  principalCV,
  ReadOnlyFunctionOptions
} from "@stacks/transactions"
import { tokenMap, Tokens } from "../utils/helpers"
import { isStxOrStxWrapper } from "../utils/filter-tokens"

export async function getBalance(
  token: Tokens,
  address: string,
  network: StacksMainnet
) {
  if (isStxOrStxWrapper(token)) token = Tokens.ASTX

  const functionArgs = [principalCV(address)]
  const contract = tokenMap[token].contract
  const options: ReadOnlyFunctionOptions = {
    contractAddress: contract.split(".")[0],
    contractName: contract.split(".")[1],
    functionName: "get-balance",
    functionArgs,
    network,
    senderAddress: address
  }
  const response = await callReadOnlyFunction(options)
  // @ts-ignore
  const balanceCV = response.value
  const balance = cvToValue(balanceCV)
  return balance
}
