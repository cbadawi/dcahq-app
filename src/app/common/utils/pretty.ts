export function prettyAddress(address: string): string {
  if (address.length <= 6) {
    return address
  }

  const prefix = address.slice(0, 3)
  const suffix = address.slice(-4)

  return `${prefix}..${suffix}`
}

export function prettyBalance(
  balance: BigInt | number | string,
  dec = 8,
  showDec = true
): string {
  if (typeof balance === "number" && isNaN(balance)) return "0"
  if (typeof balance === "bigint" && balance === BigInt(0)) return "0"
  const numberBalance = Number(`${balance}`) / Number(10 ** dec)
  const formattedBalance = showDec
    ? numberBalance
    : Math.floor(Number(numberBalance))
  return formattedBalance.toLocaleString()
}

export function prettyPrice(price: number | string) {
  const numericPrice = typeof price === "string" ? parseFloat(price) : price
  if (isNaN(numericPrice) || numericPrice == Infinity) {
    return "--"
  } else if (numericPrice >= 1) {
    // For values >= 1, round to 2 decimal places and remove trailing zeros if integer
    const formattedPrice = numericPrice.toFixed(2)
    return formattedPrice.endsWith(".00")
      ? formattedPrice.slice(0, -3)
      : formattedPrice
  } else if (numericPrice > 0 && numericPrice < 1) {
    // For values < 1, determine the number of significant digits
    // Find the number of digits before the first non-zero digit
    const exponent = Number(numericPrice.toExponential().split("e")[1])
    const decimalDigits = exponent * -1
    const precision = Math.max(decimalDigits + 2, 3) // At least 3 significant digits
    return numericPrice.toPrecision(precision)
  } else {
    // For 0 or negative values, return the number as is
    return numericPrice.toString()
  }
}

export function prettyTimestamp(ts: number): string {
  const date = new Date(ts)
  const hours = date.getHours()
  const minutes = "0" + date.getMinutes()
  const seconds = "0" + date.getSeconds()
  const day = date.getDate()
  const month = date.toLocaleString("default", { month: "long" })

  const formattedTime =
    month +
    " " +
    day +
    ", " +
    hours +
    ":" +
    minutes.slice(-2) +
    ":" +
    seconds.slice(-2)

  return formattedTime
}
