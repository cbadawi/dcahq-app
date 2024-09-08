export function prettyAddress(address: string): string {
  if (address.length <= 6) {
    return address
  }

  const prefix = address.slice(0, 3)
  const suffix = address.slice(-4)

  return `${prefix}..${suffix}`
}

export function prettyBalance(
  balance: BigInt | number,
  dec = 8,
  showDec = true
): string {
  const numberBalance = Number(balance) / 10 ** dec
  const formattedBalance = showDec ? numberBalance : Math.floor(numberBalance)
  return formattedBalance.toLocaleString()
}

export function prettyPrice(price: number) {
  if (price >= 1) {
    // For values >= 1, round to 2 decimal places
    return price.toFixed(2)
  } else if (price > 0 && price < 1) {
    // For values < 1, determine the number of significant digits
    // Find the number of digits before the first non-zero digit
    const exponent = Number(price.toExponential().split("e")[1])
    const decimalDigits = exponent * -1
    const precision = Math.max(decimalDigits + 2, 3) // At least 3 significant digits
    return price.toPrecision(precision)
  } else {
    // For 0 or negative values, return the number as is
    return price.toString()
  }
}
