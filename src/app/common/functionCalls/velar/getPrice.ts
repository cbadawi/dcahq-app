import {
  boolCV,
  callReadOnlyFunction,
  cvToValue,
  principalCV,
  ReadOnlyFunctionOptions,
  uintCV
} from "@stacks/transactions"
import {
  contractDeployer,
  dcaManagerName,
  tokenMap,
  Tokens
} from "../../utils/helpers"
import { StacksMainnet } from "@stacks/network"

export async function getPrice(params: {
  network: StacksMainnet
  poolId: number
  token0: Tokens
  tokenIn: Tokens
  amtIn: string
  isSourceNumerator: boolean
}) {
  const { network, poolId, token0, isSourceNumerator, tokenIn, amtIn } = params
  console.log("Attempting to get velar price", {
    poolId,
    token0,
    tokenIn,
    amtIn,
    isSourceNumerator
  })
  const functionArgs = [
    uintCV(poolId),
    principalCV(tokenMap[token0].contract),
    principalCV(tokenMap[tokenIn].contract),
    uintCV(amtIn),
    boolCV(isSourceNumerator)
  ]

  const options: ReadOnlyFunctionOptions = {
    contractAddress: contractDeployer,
    contractName: dcaManagerName,
    functionName: "get-price-b",
    functionArgs,
    network,
    senderAddress: contractDeployer
  }

  const response = await callReadOnlyFunction(options)
  console.log("velar get-price-b getprice", {
    velarprice: response,
    token0,
    tokenIn,
    amtIn,
    isSourceNumerator,
    poolId
  })
  // prices are welsh/stx
  return 1 / (cvToValue(response).value / 10 ** tokenMap[tokenIn].decimal)
}
