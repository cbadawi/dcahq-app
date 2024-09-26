import { isAlexToken, isVelarToken } from "./filter-tokens"
import { AMM, stxWrappers, Tokens } from "./helpers"

//  todo needs to be more complex
export function chooseAmm(source?: Tokens, target?: Tokens) {
  if (target == Tokens.VWELSH) return AMM.Alex
  if (source && target && source == Tokens.STX) {
    if (isAlexToken(target)) return AMM.Alex
    if (isVelarToken(target)) return AMM.Velar
  }
  if (source && isAlexToken(source)) return AMM.Alex
  return AMM.Velar
}
