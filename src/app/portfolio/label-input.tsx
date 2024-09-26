import { HStack } from "@/styled-system/jsx"
import React from "react"
import { prettyPrice } from "../common/utils/prettyCV"
import { css } from "@/styled-system/css"

type LabelInputProps<T> = {
  prettier?: any
  label: string
  input: T
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const LabelInput = <T extends number | string | BigInt>({
  input,
  label,
  prettier,
  handleChange
}: LabelInputProps<T>) => {
  const isReadOnly = !handleChange
  return (
    <HStack justifyContent={"space-between"}>
      <label style={{ fontSize: "medium" }}>{label}</label>
      <input
        className={css({
          maxWidth: "5rem",
          color: "white",
          fontSize: "medium",
          fontWeight: "bold",
          textAlign: "right",
          bg: isReadOnly ? "none" : "grey",
          pr: "5px",
          borderRadius: "5px",
          cursor: isReadOnly ? "not-allowed" : "auto",
          border: isReadOnly ? "1px solid grey" : "1px solid none"
        })}
        readOnly={isReadOnly}
        value={prettier ? prettier(input) : input.toLocaleString()}
        onChange={handleChange}
        placeholder="0"
        type="text"
        inputMode="decimal"
      />
    </HStack>
  )
}

export default LabelInput
