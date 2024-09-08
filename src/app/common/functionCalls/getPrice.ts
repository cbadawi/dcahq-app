import { unstable_cache } from "next/cache"
import { StacksMainnet } from "@stacks/network"
import {
  callReadOnlyFunction,
  cvToValue,
  principalCV,
  ReadOnlyFunctionOptions,
  uintCV
} from "@stacks/transactions"
import {
  alex,
  contractDeployer,
  defaultFactor,
  stableCoins,
  tokenMap,
  Tokens
} from "../helpers"

export async function getPrice(
  tokenX: string,
  tokenY: string,
  network: StacksMainnet,
  decimal = 8,
  factor = defaultFactor
): Promise<number> {
  console.log("Attempting to get price", { tokenX, tokenY, decimal, factor })
  if (tokenX == tokenY) return 1

  if (stableCoins.includes(tokenX) && stableCoins.includes(tokenY)) return 1

  const functionArgs = [
    principalCV(tokenX),
    principalCV(tokenY),
    uintCV(factor)
  ]
  const options: ReadOnlyFunctionOptions = {
    contractAddress: alex,
    contractName: "amm-pool-v2-01",
    functionName: "get-price",
    functionArgs,
    network,
    senderAddress: contractDeployer
  }
  const response = await callReadOnlyFunction(options)
  if (response.type == 8) {
    console.log("failed getPrice", { tokenX, tokenY, decimal, factor })
    // @ts-ignore
    if (response.value.value == 2001n) {
      const tokenXPricePromise = getPrice(
        tokenMap[Tokens.wSTX].contract,
        tokenX,
        network,
        8, // TODO
        factor
      )

      const tokenYPricePromise = getPrice(
        tokenMap[Tokens.wSTX].contract,
        tokenY,
        network,
        8, // TODO
        factor
      )
      const [tokenXPrice, tokenYPrice] = await Promise.all([
        tokenXPricePromise,
        tokenYPricePromise
      ])

      return tokenYPrice / tokenXPrice
    }
    return 0
  } // error
  // @ts-ignore
  const priceCV = response.value
  const price = cvToValue(priceCV)
  console.log("getPrice", { response, price, tokenX, tokenY })
  return Number(price) / 10 ** decimal
}
