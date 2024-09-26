import { Pc, UIntCV } from "@stacks/transactions"
import { isStxOrStxWrapper } from "../utils/filter-tokens"
import { tokenMap, Tokens } from "../utils/helpers"

export function getPostConditions(
  token: Tokens,
  amount: bigint,
  userAddress: string
) {
  if (isStxOrStxWrapper(token))
    return [
      Pc.principal(userAddress)
        .willSendEq(
          // in the case of the wstx, the transfer function expect to the pow of 8 but the post condition is displaying the value as a pow of 6
          token == Tokens.ASTX
            ? (amount / BigInt(10 ** 2)).toString()
            : amount.toString()
        )
        .ustx()
    ]
  else
    return [
      Pc.principal(userAddress)
        .willSendEq(amount.toString())
        .ft(tokenMap[token].contract, tokenMap[token].assetName)
    ]
}
