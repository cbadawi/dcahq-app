import React, { useEffect, useState } from "react"
import { isEmptyOrNumberInput } from "../../common/utils/helpers"
import { css } from "@/styled-system/css"
import { VStack } from "@/styled-system/jsx"

const InputAmount = ({
  amount,
  setAmount,
  name,
  center
}: {
  amount: string
  setAmount: (amount: string) => void
  name: string
  center?: boolean
}) => {
  const [query, setQuery] = useState("")

  useEffect(() => {
    const timeOutId = setTimeout(() => setAmount(query), 500)
    return () => clearTimeout(timeOutId)
  }, [query])

  return (
    <VStack
      gap={0}
      className={css({
        textAlign: center ? "center" : ["center", "center", "right"],

        width: "100%"
      })}
    >
      <label
        htmlFor="total-amount"
        className={css({
          color: amount ? "white" : "lightcyan",
          fontWeight: "light",
          fontSize: "xl",
          marginRight: "0.5rem"
        })}
      >
        {name}
      </label>
      <input
        value={query}
        onChange={e => {
          const value = e.target.value
          if (isEmptyOrNumberInput(value)) {
            setQuery(value)
          }
        }}
        placeholder={"0"}
        name="total-amount"
        type="text"
        inputMode="decimal"
        className={css({
          marginRight: "0.5rem",
          width: "100%",
          color: amount ? "white" : "lightcyan",
          fontWeight: "light",
          fontSize: "xl",
          textAlign: center ? "center" : ["center", "center", "right"],
          bg: "transparent",
          border: "none",
          outline: "none",
          borderBottom: ["", "", "1px solid gray"]
        })}
      />
    </VStack>
  )
}

export default InputAmount
