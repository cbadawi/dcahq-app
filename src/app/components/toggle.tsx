import { cva } from "@/styled-system/css"
import { styled } from "@/styled-system/jsx"
import { type ChangeEvent, memo, useState } from "react"

const toggleRecipe = cva({
  base: {
    position: "relative",
    display: "inline-block",
    width: "42px",
    height: "25px",
    "& input": {
      opacity: 0,
      width: 0,
      height: 0
    },
    "& .slider": {
      position: "absolute",
      cursor: "pointer",
      top: "0",
      left: "0",
      right: "0",
      bottom: "0",
      backgroundColor: "grey",
      border: "1px solid white",
      transition: ".5s",
      "&:before": {
        position: "absolute",
        content: '""',
        height: "18px",
        width: "18px",
        left: "3px",
        top: "3px",
        backgroundColor: "#010212",
        transition: ".5s"
      }
    },
    "& input:checked + .slider": {
      backgroundColor: "red",
      border: "1px solid red"
    },
    "& input:checked + .slider:before": {
      transform: "translateX(15px)"
    }
  },
  variants: {
    shape: {
      round: {
        "& .slider": {
          borderRadius: "16px"
        },
        "& .slider:before": {
          borderRadius: "50%"
        }
      }
    }
  },
  defaultVariants: {
    shape: "round"
  }
})

const ToggleSwitch = styled("label", toggleRecipe)

function Toggle({
  inputValue,
  handleSelection,
  getInitialState = () => false
}: {
  inputValue: string
  getInitialState?(): boolean
  handleSelection(e: ChangeEvent<HTMLInputElement>, isSelected: boolean): void
}) {
  const [isSelected, setIsSelected] = useState(() => getInitialState())

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    const newState = !isSelected
    setIsSelected(newState)
    handleSelection(e, newState)
  }

  return (
    <ToggleSwitch>
      <input
        type="checkbox"
        value={inputValue}
        checked={isSelected}
        onChange={onChange}
      />
      <span className="slider"></span>
    </ToggleSwitch>
  )
}

export default memo(Toggle)
