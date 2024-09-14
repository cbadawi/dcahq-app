"use client"
import React, { useEffect } from "react"

import { showConnect, UserData } from "@stacks/connect"
import { prettyAddress } from "@/src/app/common/prettyCV"
import { useUser } from "@/src/app/contexts/UserProvider"
import { connectWalletRecipe } from "./connect-wallet-recipe"
import { styled } from "@/styled-system/jsx"

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
      return
    }

    showConnect({
      appDetails: {
        name: "Sup",
        icon: "https://assets.website-files.com/618b0aafa4afde65f2fe38fe/618b0aafa4afde2ae1fe3a1f_icon-isotipo.svg"
      },
      redirectTo: "/",
      onFinish: () => {
        window.location.reload()
      },
      onCancel: () => {
        console.log("oops")
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
