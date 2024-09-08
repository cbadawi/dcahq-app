export const maxUint128 = BigInt("340282366920938463463374607431768211455")
export const maxJavascriptNumber = 9007199254740991
export const defaultFactor = 100_000_000

export const appName = "DCA HQ"
export const contractName = "dca-manager"

export const contractDeployer = "SP3XZG3JKX58XC3DN1PQGSYJDYMSKM55RM43V6SN"
export const dcaManagerContract = contractDeployer + "." + contractName
export const dcaRegistryContract = contractDeployer + ".dca-registry"
export const dcaVaultContract = contractDeployer + ".dca-vault"
export const authContract = contractDeployer + ".auth"
export const defaultStrategyContract = contractDeployer + ".default-strategy"

export const alex = "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM"

export enum Intervals {
  hours2,
  daily,
  weekly
}

export enum Tokens {
  wSTX = "STX",
  sUSDT = "sUSDT",
  WWELSH = "WELSH"
}

export const sourceTokens: Tokens[] = [Tokens.wSTX, Tokens.sUSDT]

export const targetTokens: Tokens[] = [Tokens.WWELSH, Tokens.wSTX, Tokens.sUSDT]

export const wStxContract =
  "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.token-wstx-v2"
export const sUsdtContract =
  "SP2XD7417HGPRTREMKF748VNEQPDRR0RMANB7X1NK.token-susdt"
export const wWelshContract =
  "SP102V8P0F7JX67ARQ77WEA3D3CFB5XW39REDT0AM.token-wcorgi"
export const tokenMap: {
  [key in Tokens]: {
    contract: string
    decimal: number
    assetName: string
    image: string
  }
} = {
  [Tokens.wSTX]: {
    contract: wStxContract,
    image: "/stx.svg",
    decimal: 8,
    assetName: "wstx"
  },
  [Tokens.sUSDT]: {
    contract: sUsdtContract,
    decimal: 8,
    image: "/susdt.svg",
    assetName: "bridged-usdt"
  },
  [Tokens.WWELSH]: {
    contract: wWelshContract,
    image: "/welsh_tokenlogo.png",
    decimal: 8,
    assetName: "wcorgi"
  }
}

export const stableCoins = [tokenMap[Tokens.sUSDT].contract]

export const isEmptyOrNumberInput = (value: string) =>
  value === "" || /^\d*\.?\d*$/.test(value)
