"use client"
import React, { useEffect } from "react"
import { showConnect, UserData } from "@stacks/connect"
import { prettyAddress } from "@/src/app/common/utils/pretty"
import { useUser } from "@/src/app/contexts/UserProvider"
import { connectWalletRecipe } from "./connect-wallet-recipe"
import { styled } from "@/styled-system/jsx"
import { getAppDetails } from "../../common/appDetails"

interface ConnectWalletProps {
  variant?: "default" | "createDcaButton"
}

const ConnectWalletButton = styled("button", connectWalletRecipe)

const ConnectWallet: React.FC<ConnectWalletProps> = ({
  variant = "default"
}) => {
  const { userSession, userData, setUserData } = useUser()

  function authenticate() {
    if (userData) {
      userSession.signUserOut()
      setUserData(null)
      window.location.reload()
      return
    }

    showConnect({
      appDetails: getAppDetails(),
      redirectTo: "/",
      onFinish: () => {
        window.location.reload()
      },
      onCancel: () => {
        console.log("tx canceled oops")
      },
      userSession
    })
  }

  useEffect(() => {
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData: UserData) => {
        setUserData(userData)
      })
    } else if (userSession.isUserSignedIn()) {
      setUserData(userSession.loadUserData())
    }
  }, [])

  return (
    <ConnectWalletButton onClick={authenticate} variant={variant}>
      {userData
        ? prettyAddress(userData.profile.stxAddress.mainnet)
        : "Connect Wallet"}
    </ConnectWalletButton>
  )
}

export default ConnectWallet
