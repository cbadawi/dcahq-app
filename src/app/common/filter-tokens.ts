import {
  alexTokenConfig,
  stxWrappers,
  tokenMap,
  Tokens,
  velarTokenConfig
} from "./helpers"

export const isAlexToken = (token: Tokens) =>
  token === Tokens.ASTX || alexTokenConfig[Tokens.ASTX]?.[token]

export const isVelarToken = (token: Tokens) =>
  token === Tokens.VSTX || velarTokenConfig[Tokens.VSTX]?.[token]

export function getAvailableTargetTokens(allTokens: Tokens[], source: Tokens) {
  if (isStxOrStxWrapper(source))
    return allTokens.filter(t => t != source && !isWrapper(t))

  return allTokens.filter(t => {
    if (t != source)
      if (isAlexToken(source)) {
        return isAlexToken(t)
      } else if (isVelarToken(source)) {
        if (t == Tokens.VWELSH) return false
        return isVelarToken(t)
      }
    return false
  })
}

// Needs to filter duplicates such as wrappers
export function getAvailableSourceTokens(allTokens: Tokens[]) {
  return allTokens.filter(t => !isWrapper(t))
}

const isWrapper = (token: Tokens) => {
  return (
    tokenMap[token].assetName == "wstx" || tokenMap[token].assetName == "wcorgi"
  )
}

export const isStxOrStxWrapper = (token: Tokens) =>
  token && (token == Tokens.STX || stxWrappers.includes(token))
