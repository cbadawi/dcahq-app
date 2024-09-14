import { StacksMainnet } from "@stacks/network"
import React, { useState } from "react"
import { createDCA } from "../common/functionCalls/dca/createDca"
import { tokenMap, Tokens } from "../common/helpers"
import { css } from "@/styled-system/css"
import { ToastContainer, toast } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import ConnectWallet from "../components/navigation/ConnectWallet"

const CreateDcaButton = ({
  network,
  sourceToken,
  targetToken,
  interval,
  totalAmount,
  purchaseAmount,
  minPrice,
  maxPrice
}: {
  network: StacksMainnet | null
  sourceToken: Tokens
  targetToken: Tokens
  interval: number
  totalAmount: string
  purchaseAmount: string
  minPrice: bigint
  maxPrice: bigint
}) => {
  const [txID, setTxId] = useState("")
  if (!network) return <ConnectWallet variant="createDcaButton" />
  const decimals = tokenMap[sourceToken].decimal
  return (
    <>
      <button
        className={css({
          background: "linear-gradient(to right, red 0%, orange 100%)",
          cursor: "pointer",
          color: "white",
          padding: "10px 20px",
          border: "none",
          borderRadius: "5px",
          _hover: {
            background: "linear-gradient(to right, darkred 0%, darkorange 100%)"
          }
        })}
        onClick={async () => {
          try {
            await createDCA(
              sourceToken,
              targetToken,
              interval,
              parseInt(totalAmount) * 10 ** decimals,
              parseInt(purchaseAmount) * 10 ** decimals,
              network,
              minPrice.toString(),
              maxPrice.toString(),
              setTxId
            )
            toast.success("Click here!" + txID, {
              position: "top-left",
              onClick: () => {
                window.open(`https://stxscan.co/transactions/${txID}`, "_blank")
              }
            })
          } catch (error) {
            if (
              error instanceof Error &&
              error.message.includes(
                "No user data found. Did the user sign in?"
              )
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
        }}
      >
        DCA
      </button>
      <ToastContainer />
    </>
  )
}

export default CreateDcaButton
