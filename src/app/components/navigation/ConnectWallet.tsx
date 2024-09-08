"use client"
import React, { useEffect } from "react"
import { css } from "@/styled-system/css"
import { showConnect, UserData } from "@stacks/connect"
import { prettyAddress } from "@/src/app//common/prettyCV"
import { useUser } from "@/src/app/contexts/UserProvider"
const ConnectWallet = () => {
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
    console.log("userSession.isSignInPending()", userSession.isSignInPending())
    console.log("userSession.isUserSignedIn()", userSession.isUserSignedIn())
    if (userSession.isSignInPending()) {
      userSession.handlePendingSignIn().then((userData: UserData) => {
        console.log("userSession.handlePendingSignIn()", { userData })
        setUserData(userData)
      })
    } else if (userSession.isUserSignedIn()) {
      console.log({ "userSession.loadUserData()": userSession.loadUserData() })
      setUserData(userSession.loadUserData())
      console.log({ userSession, setUserData })
    }
  }, [])
  // }, [userSession, setUserData]) // https://stackoverflow.com/a/62601621

  return (
    <button
      onClick={() => authenticate()}
      className={css({
        backgroundColor: "#ee6d01",
        padding: "0.5rem 1rem",
        borderRadius: "0.25rem",
        color: "white",
        cursor: "pointer",
        border: "none",
        fontFamily: "inherit",
        fontSize: "inherit",
        display: "flex",
        alignItems: "center",
        _hover: { bg: "#fe953d" }
      })}
    >
      {userData
        ? prettyAddress(userData.profile.stxAddress.mainnet)
        : "Connect Wallet"}
    </button>
  )
}

export default ConnectWallet
