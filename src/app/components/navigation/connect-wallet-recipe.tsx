import { cva } from "@/styled-system/css"

export const connectWalletRecipe = cva({
  base: {
    padding: "0.5rem 1rem",
    borderRadius: "0.25rem",
    color: "white",
    cursor: "pointer",
    border: "none",
    fontFamily: "inherit",
    fontSize: "inherit",
    display: "flex",
    alignItems: "center",
    transition: "background-color 0.3s"
  },
  variants: {
    variant: {
      default: {
        backgroundColor: "#ee6d01",
        "&:hover": {
          backgroundColor: "#fe953d"
        }
      },
      createDcaButton: {
        display: "flex",
        justifyContent: "center",
        bgGradient: "to-r",
        gradientFrom: "red.500",
        gradientTo: "orange.500",
        "&:hover": {
          bgGradient: "to-r",
          gradientFrom: "red.600",
          gradientTo: "orange.600"
        }
      }
    }
  },
  defaultVariants: {
    variant: "default"
  }
})
