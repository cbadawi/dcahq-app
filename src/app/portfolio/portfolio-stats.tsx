"use client"

import { VStack } from "@/styled-system/jsx"
import React, { useEffect, useState } from "react"
import { useUser } from "../contexts/UserProvider"
import { StacksMainnet } from "@stacks/network"
import { getUserKeys } from "../common/functionCalls/getUserKeys"
import { UserKey, ValuePieChartData } from "../common/utils/helpers"
import NoPositionsFound from "./no-positions-found"

import PositionStats from "./position-stats"

// const onRenderCallback = (id: any, phase: any, actualDuration: any) => {
//   console.log({ id, phase, actualDuration })
// }

const PortfolioStats = () => {
  const { userSession } = useUser()
  const [user, setUser] = useState<string>("")
  const [userKeys, setUserKeys] = useState<UserKey[]>([])
  const [network, setNetwork] = useState<StacksMainnet>(new StacksMainnet())
  const [isLoading, setIsLoading] = useState<boolean>(true)

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

  if (!userSession?.isUserSignedIn() || (!userKeys.length && !isLoading))
    return <NoPositionsFound />
  // cards per dca position with amounts, ETA
  // todo if you bought instead of DCA'd you would have had XX instead of YY
  return (
    <div>
      {/* <Profiler id="MyComponent" onRender={onRenderCallback}> */}
      <VStack>
        <VStack>
          {!!user &&
            !!network &&
            userKeys.map((userKey, index) => (
              <PositionStats
                key={index}
                userKey={userKey}
                address={user}
                network={network}
              />
            ))}
        </VStack>
      </VStack>
      {/* </Profiler> */}
    </div>
  )
}

export default PortfolioStats
