import { StacksMainnet } from "@stacks/network"
import {
  callReadOnlyFunction,
  cvToValue,
  principalCV,
  ReadOnlyFunctionOptions
} from "@stacks/transactions"
import { contractDeployer, dcaManagerName, UserKey } from "../utils/helpers"

export async function getUserKeys(user: string, network: StacksMainnet) {
  if (!user) return []
  const functionArgs = [principalCV(user)]
  const options: ReadOnlyFunctionOptions = {
    contractAddress: contractDeployer,
    contractName: dcaManagerName,
    functionName: "get-user-keys",
    functionArgs,
    network,
    senderAddress: user
  }

  const response = await callReadOnlyFunction(options)
  if (response.type == 9) return [] // noneCV
  const userKeys = cvToValue(response)
  return parseToUserKeys(userKeys)
}

function parseToUserKeys(input: any): UserKey[] {
  return input.value.map((item: any) => {
    const { interval, strategy, source, target } = item.value
    return {
      interval: parseInt(interval.value),
      strategy: strategy.value,
      source: source.value,
      target: target.value
    }
  })
}
