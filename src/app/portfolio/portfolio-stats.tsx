"use client"

import { HStack, VStack } from "@/styled-system/jsx"
import React, { useEffect, useState } from "react"
import { useUser } from "../contexts/UserProvider"
import { StacksMainnet } from "@stacks/network"
import { getUserKeys } from "../common/functionCalls/getUserKeys"
import { UserKey, ValuePieChartData } from "../common/utils/helpers"
import NoPositionsFound from "./no-positions-found"
import PositionStats from "./position-stats"
import PieChart from "../components/charts/pie-chart"
import { groupAndSumByToken } from "../common/groupBy"
import PositionStatsContainer from "./position-stats-container"

const PortfolioStats = () => {
  const { userSession } = useUser()
  const [user, setUser] = useState<string>("")
  const [userKeys, setUserKeys] = useState<UserKey[]>([])
  const [network] = useState<StacksMainnet>(new StacksMainnet())
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sourcesValues, setSourcesValues] = useState<ValuePieChartData[]>([])
  const [targetsValues, setTargetsValues] = useState<ValuePieChartData[]>([])

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

  console.log({
    user,
    network,
    userKeys,
    sourcesValues,
    targetsValues
  })
  if (isLoading) return <div>Loading...</div> // todo use a loading spinner
  if (!user || !userKeys?.length) return <NoPositionsFound />
  return (
    <VStack>
      {!!user && !!network && (
        <HStack>
          <PieChart data={groupAndSumByToken(sourcesValues)} name="Source" />
          <PieChart data={groupAndSumByToken(targetsValues)} name="Target" />
        </HStack>
      )}
      <VStack>
        {userKeys.map((userKey, index) => (
          <PositionStatsContainer
            key={index}
            userKey={userKey}
            address={user}
            network={network}
            setSourcesValues={setSourcesValues}
            setTargetsValues={setTargetsValues}
          />
        ))}
      </VStack>
    </VStack>
  )
}

export default PortfolioStats
