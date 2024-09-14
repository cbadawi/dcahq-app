import { stableCoins, stxWrappers, Tokens } from "./helpers"

export function isSourceANumerator(source: Tokens, target: Tokens) {
  if (stxWrappers.includes(source)) return false
  if (stableCoins.includes(target)) return false

  return false // todo
}
