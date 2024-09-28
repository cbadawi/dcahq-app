import { StacksMainnet } from "@stacks/network"
import {
  callReadOnlyFunction,
  cvToValue,
  principalCV,
  ReadOnlyFunctionOptions,
  uintCV
} from "@stacks/transactions"
import {
  contractDeployer,
  DcaData,
  dcaManagerName,
  UserKey
} from "../utils/helpers"

export async function getDcaData(
  user: string,
  source: string,
  target: string,
  interval: number,
  strategy: string,
  network: StacksMainnet
): Promise<DcaData | undefined> {
  const functionArgs = [
    principalCV(user),
    principalCV(source),
    principalCV(target),
    uintCV(interval),
    principalCV(strategy)
  ]
  const options: ReadOnlyFunctionOptions = {
    contractAddress: contractDeployer,
    contractName: dcaManagerName,
    functionName: "get-dca-data",
    functionArgs,
    network,
    senderAddress: user
  }

  const response = await callReadOnlyFunction(options)
  if (response.type == 9) return undefined // noneCV
  const dcaDataValue = cvToValue(response)
  return parseToDcaData(dcaDataValue)
}

function parseToDcaData(input: any): DcaData {
  const {
    "is-paused": isPaused,
    amount: amount,
    "source-amount-left": sourceAmountLeft,
    "target-amount": targetAmount,
    "min-price": minPrice,
    "max-price": maxPrice,
    "last-updated-timestamp": lastUpdatedTimestamp
  } = input.value

  return {
    isPaused: isPaused.value,
    amount: amount.value,
    sourceAmountLeft: sourceAmountLeft.value,
    targetAmount: targetAmount.value,
    minPrice: minPrice.value,
    maxPrice: maxPrice.value,
    lastUpdatedTimestamp: lastUpdatedTimestamp.value
  }
}
