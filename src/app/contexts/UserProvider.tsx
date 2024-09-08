"use client"

import React, { createContext, useState, useContext, ReactNode } from "react"
import { AppConfig, UserSession } from "@stacks/connect"

interface UserContextType {
  userSession: UserSession
  userData: any | null
  setUserData: (data: any) => void
}

const UserContext = createContext<UserContextType | undefined>(undefined)

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children
}) => {
  const appConfig = new AppConfig(["publish_data"])
  const userSession = new UserSession({ appConfig })
  const [userData, setUserData] = useState<any | null>(null)

  return (
    <UserContext.Provider value={{ userSession, userData, setUserData }}>
      {children}
    </UserContext.Provider>
  )
}

export const useUser = () => {
  const context = useContext(UserContext)
  if (context === undefined) {
    throw new Error("useUser must be used within a UserProvider")
  }
  return context
}
