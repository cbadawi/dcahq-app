import { token } from "@/styled-system/tokens"
import { chooseAmm } from "./chooseAmm"
import {
  alexPairConfig,
  AMM,
  stableCoins,
  stxWrappers,
  tokenMap,
  Tokens,
  velarPairConfig
} from "./helpers"
import { isStxOrStxWrapper } from "./filter-tokens"

export function isSourceANumerator(source: Tokens, target: Tokens) {
  const amm = chooseAmm(source, target)

  if (amm == AMM.Alex) {
    if (isStxOrStxWrapper(source)) source = Tokens.ASTX
    return alexPairConfig[source]![target]?.isSourceNumerator
  } else if (amm == AMM.Velar) {
    if (isStxOrStxWrapper(source)) source = Tokens.VSTX
    return velarPairConfig[source]![target]?.isSourceNumerator
  }
}

export function getPriceRatioDisplay(source: Tokens, target: Tokens) {
  const sourceDisplay = tokenMap[source].displayName
  const targetDisplay = tokenMap[target].displayName
  return (
    (isSourceANumerator(source, target)
      ? `${sourceDisplay}/${targetDisplay}`
      : `${targetDisplay}/${sourceDisplay}`
    ).toLowerCase() + " price"
  )
}
