import { StacksMainnet } from "@stacks/network"
import React, { memo, useState } from "react"
import { css } from "@/styled-system/css"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { useUser } from "../../contexts/UserProvider"
import ConnectWallet from "../navigation/ConnectWallet"
import { createDCA } from "../../common/functionCalls/dca/createDca"
import { Tokens } from "../../common/utils/helpers"
import {
  handleFunctionCallError,
  handleFunctionCallTx
} from "../../common/tx-handlers"

const CreateDcaButton = ({
  network,
  sourceToken,
  targetToken,
  interval,
  totalAmount,
  purchaseAmount,
  minPrice,
  maxPrice,
  userAddress,
  resetHandlerPostDca
}: {
  network: StacksMainnet | null
  sourceToken: Tokens
  targetToken: Tokens
  interval: number
  totalAmount: string
  purchaseAmount: string
  minPrice: string
  maxPrice: string
  userAddress: string
  resetHandlerPostDca?: () => void
}) => {
  const [txID, setTxId] = useState("")
  useUser()
  if (!network) return <ConnectWallet variant="createDcaButton" />
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
              totalAmount,
              purchaseAmount,
              network,
              userAddress,
              minPrice,
              maxPrice,
              setTxId
            )
            handleFunctionCallTx(txID, resetHandlerPostDca)
          } catch (error) {
            handleFunctionCallError(error)
          }
        }}
      >
        DCA
      </button>
      <ToastContainer />
    </>
  )
}

export default memo(CreateDcaButton)
