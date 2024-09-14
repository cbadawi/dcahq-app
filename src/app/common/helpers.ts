export const maxUint128 = BigInt("340282366920938463463374607431768211455")
export const maxJavascriptNumber = 9007199254740991
export const defaultFactor = 100_000_000

export const appName = "DCA HQ"
const version = "-v0"
export const contractDeployer = "SPNG8GDC6VW6SPAGE5M9ZCASPJWK65NDTH2E84HX"

export const authName = "auth" + version
export const dcaManagerName = "dca-manager" + version + "-1"
export const dcaVaultName = "dca-vault" + version
export const defaultStrategyName = "default-strategy" + version + "-0"
export const strategyName = "auth" + version

export const ONE_6 = 10 ** 6
export const ONE_8 = 10 ** 8

export const alex = "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM"

export enum Intervals {
  hours2,
  daily,
  weekly
}

export enum AMM {
  Alex,
  Velar
}

export enum Tokens {
  STX = 1,
  // Alex
  ASTX = 2,
  AUSDT = 3,
  AWWELSH = 4,
  // Velar
  VSTX = 5,
  VAEUSDC = 6,
  VWELSH = 7
}

export const sourceTokens = [
  Tokens.STX,
  // alex
  Tokens.ASTX,
  Tokens.AUSDT,
  // velar
  Tokens.VSTX,
  Tokens.VAEUSDC
]

export const targetTokens = [
  Tokens.STX,
  // alex
  Tokens.ASTX,
  Tokens.AWWELSH,
  // velar
  Tokens.VSTX,
  Tokens.VWELSH
]

export const alexWStxContract =
  "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.token-wstx-v2"
export const alexUsdtContract =
  "SP2XD7417HGPRTREMKF748VNEQPDRR0RMANB7X1NK.token-susdt"
export const alexWelshContract =
  "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.token-wcorgi"

//velar
export const velarCore = "SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.univ2-core"
export const velarLibrary =
  "SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.univ2-library"
export const shareFeeToContract =
  "SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.univ2-share-fee-to"

export const velarAeusdcContract =
  "SP3Y2ZSH8P7D50B0VBTSX11S7XSG24M1VB9YFQA4K.token-aeusdc"
export const velarAeusdcDecimal = 6
export const velarWstxContract =
  "SP1Y5YSTAHZ88XYK1VPDH24GY0HPX5J4JECTMY4A1.wstx"
export const velarWstxDecimal = 6
export const welshContract =
  "SP3NE50GEXFG9SZGTT51P40X2CKYSZ5CC4ZTZ7A2G.welshcorgicoin-token"
export const velarWelshDecimal = 6

export const stxWrappers = [Tokens.ASTX, Tokens.VSTX]

export const tokenMap: {
  [key in Tokens]: {
    contract: string
    decimal: number
    assetName: string
    image: string
    displayName: string
  }
} = {
  [Tokens.STX]: {
    contract: "stx",
    image: "/stx.svg",
    decimal: 6,
    assetName: "stx",
    displayName: "STX"
  },
  //  ALEX
  [Tokens.ASTX]: {
    contract: alexWStxContract,
    image: "/stx.svg",
    decimal: 8,
    assetName: "wstx",
    displayName: "STX"
  },
  [Tokens.AUSDT]: {
    contract: alexUsdtContract,
    decimal: 8,
    image: "/susdt.svg",
    assetName: "bridged-usdt",
    displayName: "USDT"
  },
  [Tokens.AWWELSH]: {
    contract: alexWelshContract,
    image: "/welsh_tokenlogo.png",
    decimal: 8,
    assetName: "wcorgi",
    displayName: "WELSH"
  },
  // VELAR
  [Tokens.VSTX]: {
    contract: velarWstxContract,
    image: "/stx.svg",
    decimal: velarWstxDecimal,
    assetName: "wstx",
    displayName: "STX"
  },
  [Tokens.VAEUSDC]: {
    contract: velarAeusdcContract,
    image: "https://s2.coinmarketcap.com/static/img/coins/64x64/18852.png",
    decimal: velarWelshDecimal,
    assetName: "aeUSDC",
    displayName: "aeUSDC"
  },
  [Tokens.VWELSH]: {
    contract: welshContract,
    image: "/welsh_tokenlogo.png",
    decimal: velarWstxDecimal,
    assetName: "welsh",
    displayName: "WELSH"
  }
}

export const stableCoins = [Tokens.AUSDT, Tokens.VAEUSDC]

type AlexTokenCombinations = {
  [key in Tokens]?: {
    [key in Tokens]?: { factor: number }
  }
}

type VelarTokenCombinations = {
  [key in Tokens]?: {
    [key in Tokens]?: { poolId: number; token0: Tokens }
  }
}

export const alexTokenConfig: AlexTokenCombinations = {
  [Tokens.ASTX]: {
    [Tokens.AUSDT]: { factor: defaultFactor },
    [Tokens.AWWELSH]: { factor: defaultFactor }
  },
  [Tokens.AUSDT]: {
    [Tokens.ASTX]: { factor: defaultFactor },
    [Tokens.AWWELSH]: { factor: defaultFactor }
  }
}
export const velarTokenConfig: VelarTokenCombinations = {
  [Tokens.VSTX]: {
    [Tokens.VAEUSDC]: { poolId: 6, token0: Tokens.VSTX },
    [Tokens.VWELSH]: { poolId: 27, token0: Tokens.VSTX }
  },
  [Tokens.VAEUSDC]: {
    [Tokens.VSTX]: { poolId: 6, token0: Tokens.VSTX },
    [Tokens.VWELSH]: { poolId: 10, token0: Tokens.VWELSH } // disabled in tokens filtering
  },
  [Tokens.VWELSH]: {
    // [Tokens.VAEUSDC]: { poolId: 10, token0: Tokens.VWELSH }
    [Tokens.VSTX]: { poolId: 27, token0: Tokens.VSTX }
  }
}

export const isEmptyOrNumberInput = (value: string) =>
  value === "" || /^\d*\.?\d*$/.test(value)

export const colors = [
  "#634bde",
  "#0033ad",
  "#00ffbd",
  "#F7931A",
  "rgb(250,0,0)",
  "LightSalmon",
  "rgb(100,250,250)",
  "rgb(0,250,0)",
  "rgb(250,250,100)",
  "rgb(250,250,250)",
  "rgb(250,100,100)",
  "rgb(100,250,250)",
  "MediumSpringGreen",
  "blueviolet",
  "brown",
  "burlywood",
  "burlywood",
  "chartreuse",
  "cornflowerblue",
  "crimson",
  "cyan",
  "darkolivegreen"
]
