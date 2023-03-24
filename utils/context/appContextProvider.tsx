"use client"
import React, { useState } from 'react'


interface IAppContext {
  searchString: string 
  setSearchString: React.Dispatch<React.SetStateAction<string>>
  setUser: React.Dispatch<React.SetStateAction<TVendor | null>>
  user: TVendor | null
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
}

export const AppContext = React.createContext<IAppContext | null>(null)

export default function AppContextProvider({children}: {children: React.ReactNode}) {
  const [searchString, setSearchString] = useState("")
  const [user, setUser] = useState<TVendor | null>(null)
  const [error, setError] = useState<string | null>(null)

  return (
    <AppContext.Provider value={{searchString, setSearchString, user, setUser, error, setError}}>
      {children}
    </AppContext.Provider>
  )
}