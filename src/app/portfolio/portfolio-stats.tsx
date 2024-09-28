"use client"

import { Profiler } from "react"

import { Box, HStack, VStack } from "@/styled-system/jsx"
import React, { useCallback, useEffect, useMemo, useState } from "react"
import PieChart from "../components/charts/pie-chart"
import { useUser } from "../contexts/UserProvider"
import { UserData } from "@stacks/connect"
import { StacksMainnet } from "@stacks/network"
import { getUserKeys } from "../common/functionCalls/getUserKeys"
import { UserKey, ValuePieChartData } from "../common/utils/helpers"
import NoPositionsFound from "./no-positions-found"
import PositionStatsContainer from "./position-stats-container"
import { groupAndSumByToken } from "../common/groupBy"

// const onRenderCallback = (id: any, phase: any, actualDuration: any) => {
//   console.log({ id, phase, actualDuration })
// }

const PortfolioStats = () => {
  const { userSession } = useUser()
  const [user, setUser] = useState<string>("")
  const [userKeys, setUserKeys] = useState<UserKey[]>([])
  const [network, setNetwork] = useState<StacksMainnet>(new StacksMainnet())
  const [isLoading, setIsLoading] = useState<boolean>(true)
  const [sourcesValues, setSourcesValues] = useState<ValuePieChartData[]>([])
  const [targetsValues, setTargetsValues] = useState<ValuePieChartData[]>([])

  console.log("PortfolioStats 1")

  useEffect(() => {
    if (!userSession?.isUserSignedIn()) return
    const userData = userSession?.loadUserData()
    setUser(userData.profile.stxAddress.mainnet)
    const asyncGetUserKeys = async () => {
      const userKeys = await getUserKeys(
        userData.profile.stxAddress.mainnet,
        network
      )
      setUserKeys(userKeys)
      setIsLoading(false)
    }
    asyncGetUserKeys()
  }, [])

  console.log({ userKeys, sourcesValues, targetsValues })

  if (!userKeys.length && !isLoading) return <NoPositionsFound />
  // cards per dca position with amounts, ETA
  // todo if you bought instead of DCA'd you would have had XX instead of YY
  return (
    <div>
      {/* <Profiler id="MyComponent" onRender={onRenderCallback}> */}
      <VStack>
        {!!user && !!network && !!userKeys?.length && (
          <HStack>
            <PieChart data={groupAndSumByToken(sourcesValues)} name="Source" />
            <PieChart data={groupAndSumByToken(targetsValues)} name="Target" />
          </HStack>
        )}
        <VStack>
          {!!user &&
            !!network &&
            userKeys.map((userKey, index) => (
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
      {/* </Profiler> */}
    </div>
  )
}

export default PortfolioStats
