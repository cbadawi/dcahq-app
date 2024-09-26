import { toast } from "react-toastify"

export const handleFunctionCallTx = (
  txID: string,
  resetInputHandler?: () => void
) => {
  console.log("createDca new TxID ", txID)
  if (txID) {
    toast.success("View transaction", {
      position: "top-left",
      onClick: () => {
        window.open(`https://stxscan.co/transactions/${txID}`, "_blank")
      }
    })
    if (resetInputHandler) resetInputHandler()
  }
}

export const handleFunctionCallError = (error: unknown) => {
  if (
    error instanceof Error &&
    error.message.includes("No user data found. Did the user sign in?")
  ) {
    console.log("Specific error: No user data found", error)
    toast.error("Please sign in to continue", {
      position: "top-left"
    })
  } else {
    // Handle other errors
    console.log("Other error", error)
    toast.error("An unexpected error occurred", {
      position: "top-left"
    })
  }
}

export const onFinishTx = (data: any) => {
  console.log("Stacks Transaction:", data.stacksTransaction)
  console.log("Transaction ID:", data.txId)
  console.log("Raw transaction:", data.txRaw)
}
