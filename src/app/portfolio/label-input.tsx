// LabelInput.tsx
import { css } from "@/styled-system/css"
import { HStack } from "@/styled-system/jsx"
import React from "react"

type LabelInputProps<T> = {
  prettier?: (input: T) => string
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
  const displayValue = prettier ? prettier(input) : input.toString()

  return (
    <HStack justifyContent="space-between" alignItems="center">
      <span className={css({ fontSize: "md" })}>{label}</span>
      {isReadOnly ? (
        <span
          className={css({
            fontWeight: "bold",
            fontSize: "md",
            textAlign: "right",
            paddingRight: "4px"
          })}
        >
          {displayValue}
        </span>
      ) : (
        <input
          className={css({
            maxWidth: "5rem",
            color: "white",
            fontSize: "md",
            fontWeight: "bold",
            textAlign: "right",
            bg: "gray.700",
            pr: "5px",
            borderRadius: "5px"
          })}
          placeholder="0"
          type="text"
          inputMode="decimal"
          onChange={handleChange}
          value={displayValue}
        />
      )}
    </HStack>
  )
}

export default LabelInput
