// "use client"
// import { UserData } from "@stacks/connect"
// import React, { useEffect, useState } from "react"
// import SetSourcesTargetsConfigButton from "./set-sources-targets-config-button"
// import { StacksMainnet } from "@stacks/network"
// import AddApprovedButton from "./add-approved-button"
// import { VStack } from "styled-system/jsx"
// import { useUser } from "../contexts/UserProvider"

// const AdminOptions = () => {
//   const { userSession } = useUser()
//   const [user, setUser] = useState<UserData | null>(null)
//   useEffect(() => {
//     if (!userSession?.isUserSignedIn()) return
//     setUser(userSession?.loadUserData())
//   }, [])

//   const network = new StacksMainnet()

//   if (
//     !user ||
//     user?.profile.stxAddress.mainnet !=
//       "SP3XZG3JKX58XC3DN1PQGSYJDYMSKM55RM43V6SN"
//   )
//     return <span>not admin</span>

//   return (
//     <VStack marginTop="1rem" gap="1rem">
//       <AddApprovedButton network={network} />
//       <SetSourcesTargetsConfigButton user={user} network={network} />
//     </VStack>
//   )
// }

// export default AdminOptions
