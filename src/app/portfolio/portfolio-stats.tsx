"use client"

import { VStack } from "@/styled-system/jsx"
import React, { useEffect, useState } from "react"
import { useUser } from "../contexts/UserProvider"
import { StacksMainnet } from "@stacks/network"
import { getUserKeys } from "../common/functionCalls/getUserKeys"
import { UserKey } from "../common/utils/helpers"
import NoPositionsFound from "./no-positions-found"
import PositionStats from "./position-stats"

const PortfolioStats = () => {
  const { userSession } = useUser()
  const [user, setUser] = useState<string>("")
  const [userKeys, setUserKeys] = useState<UserKey[]>([])
  const [network] = useState<StacksMainnet>(new StacksMainnet())
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    const fetchData = async () => {
      if (!userSession?.isUserSignedIn()) {
        setIsLoading(false)
        return
      }
      const userData = userSession.loadUserData()
      setUser(userData.profile.stxAddress.mainnet)

      try {
        const keys = await getUserKeys(
          userData.profile.stxAddress.mainnet,
          network
        )
        setUserKeys(keys)
      } catch (error) {
        console.error("Failed to fetch user keys:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchData()
  }, [userSession, network])

  if (isLoading) return <div>Loading...</div> // todo use a loading spinner
  if (!user || !userKeys.length) return <NoPositionsFound />
  return (
    <VStack>
      {userKeys.map((userKey, index) => (
        <PositionStats
          key={index}
          userKey={userKey}
          address={user}
          network={network}
        />
      ))}
    </VStack>
  )
}

export default PortfolioStats
