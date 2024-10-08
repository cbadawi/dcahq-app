import { chooseAmm } from "./utils/chooseAmm"
import { isStxOrStxWrapper } from "./utils/filter-tokens"
import {
  alexPairConfig,
  AMM,
  tokenMap,
  Tokens,
  velarPairConfig
} from "./utils/helpers"

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
  return isSourceANumerator(source, target)
    ? `${sourceDisplay}/${targetDisplay}`
    : `${targetDisplay}/${sourceDisplay}`
}
