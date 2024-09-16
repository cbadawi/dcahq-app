import { Pc, UIntCV } from "@stacks/transactions"
import { isStxOrStxWrapper } from "../filter-tokens"
import { tokenMap, Tokens } from "../helpers"

export function getCreateDcaPostConditions(
  sourceToken: Tokens,
  amount: bigint,
  userAddress: string
) {
  if (isStxOrStxWrapper(sourceToken))
    return [
      Pc.principal(userAddress)
        .willSendEq(
          // in the case of the wstx, the transfer function expect to the pow of 8 but the post condition is displaying the value as a pow of 6
          sourceToken == Tokens.ASTX
            ? (amount / BigInt(10 ** 2)).toString()
            : amount.toString()
        )
        .ustx()
    ]
  else
    return [
      Pc.principal(userAddress)
        .willSendEq(amount.toString())
        .ft(tokenMap[sourceToken].contract, tokenMap[sourceToken].assetName)
    ]
}
