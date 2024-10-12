import { ValuePieChartData } from "./utils/helpers"

export function groupAndSumByToken(
  data: ValuePieChartData[]
): ValuePieChartData[] {
  const groupedData = data.reduce(
    (acc, { token, value, amount }) => {
      if (!acc[token]) {
        acc[token] = { value: 0, amount: 0 }
      }
      acc[token].value += value
      acc[token].amount += Number(amount)
      return acc
    },
    {} as { [token: string]: { value: number; amount: number } }
  )

  const grouped = Object.keys(groupedData).map(token => ({
    token,
    value: groupedData[token].value,
    amount: groupedData[token].amount
  }))
  return grouped
}
