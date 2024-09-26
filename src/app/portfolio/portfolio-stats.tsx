"use client"
import { Box, HStack, VStack } from "@/styled-system/jsx"
import React, { useEffect, useState } from "react"
import PieChart from "../components/charts/pie-chart"
import { useUser } from "../contexts/UserProvider"
import { UserData } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import { getUserKeys } from "../common/functionCalls/getUserKeys"
import { UserKey } from "../common/utils/helpers"
import NoPositionsFound from "./no-positions-found"
import { getDcaData } from "../common/functionCalls/getDcaData"
import PositionStats from "./position-stats"

const PortfolioStats = () => {
  const { userSession } = useUser()
  const [user, setUser] = useState<UserData | null>(null)
  const [userKeys, setUserKeys] = useState<UserKey[]>([])
  const [network, setNetwork] = useState<StacksMainnet | null>(null)
  const [isLoading, setIsLoading] = useState<boolean>(true)

  useEffect(() => {
    if (!userSession?.isUserSignedIn()) return
    const userData = userSession?.loadUserData()
    setUser(userData)
    const mainnet = new StacksMainnet()
    setNetwork(mainnet)
    const asyncGetUserKeys = async () => {
      const userKeys = await getUserKeys(
        userData.profile.stxAddress.mainnet,
        mainnet
      )
      setUserKeys(userKeys)
      setIsLoading(false)
    }
    asyncGetUserKeys()
  }, [])

  console.log({ userKeys })
  if (!userKeys.length && !isLoading) return <NoPositionsFound />
  // cards per dca position with amounts, ETA
  // todo if you bought instead of DCA'd you would have had XX instead of YY
  return (
    <div>
      <VStack>
        <HStack>
          <PieChart />
          <PieChart />
        </HStack>
        <VStack>
          {!!user &&
            !!network &&
            userKeys.map((userKey, index) => (
              <PositionStats
                key={index}
                userKey={userKey}
                address={user.profile.stxAddress.mainnet}
                network={new StacksMainnet()}
              />
            ))}
        </VStack>
      </VStack>
    </div>
  )
}

export default PortfolioStats
