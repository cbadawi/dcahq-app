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
} from "../../helpers"

// TODO refactor to use the dcamanager get-price. its 1 less api call to make in case of a multihop swap
export async function getPrice(params: {
  network: StacksMainnet
  tokenX: Tokens
  tokenY: Tokens
  decimal: number | undefined
  factor: number | undefined
}): Promise<number> {
  const { tokenX, tokenY, network, decimal, factor } = params
  console.log("Attempting to get alex price", {
    tokenX,
    tokenY,
    decimal,
    factor
  })

  const functionArgs = [
    principalCV(tokenMap[tokenX].contract),
    principalCV(tokenMap[tokenY].contract),
    uintCV(factor ?? defaultFactor)
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
    console.log("failed getPrice", {
      tokenX,
      tokenY,
      decimal,
      factor,
      response
    })
    const baseToken = Tokens.ASTX
    // @ts-ignore
    if (response.value.value == 2001n) {
      const tokenXPricePromise = getPrice({
        tokenX: baseToken,
        tokenY: tokenX,
        network,
        decimal: tokenMap[baseToken].decimal,
        factor
      })

      const tokenYPricePromise = getPrice({
        tokenX: baseToken,
        tokenY,
        network,
        decimal: tokenMap[baseToken].decimal,
        factor
      })
      const [tokenXPrice, tokenYPrice] = await Promise.all([
        tokenXPricePromise,
        tokenYPricePromise
      ])

      return tokenYPrice / tokenXPrice
    }
    return 0
  }

  // @ts-ignore
  const priceCV = response.value
  const price =
    Number(cvToValue(priceCV)) / 10 ** (decimal ?? tokenMap[tokenX].decimal)
  console.log("alex getPrice", {
    response,
    price,
    tokenX,
    tokenY,
    units: 10 ** (decimal ?? tokenMap[tokenX].decimal),
    "stableCoins.includes(tokenY)": stableCoins.includes(tokenY)
  })

  if (stableCoins.includes(tokenY)) return price
  else return 1 / price
}
