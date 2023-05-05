"use client"
import React, { useState, useEffect } from 'react'
import { checkUser } from '../auth/checkUser'


interface IAppContext {
  searchString: string 
  setSearchString: React.Dispatch<React.SetStateAction<string>>
  setUser: React.Dispatch<React.SetStateAction<TVendor | null>>
  user: TVendor | null
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  success: string | null
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>
  cartCount: number
  setCartCount: React.Dispatch<React.SetStateAction<number>>
}

export const AppContext = React.createContext<IAppContext | null>(null)



export default function AppContextProvider({children}: {children: React.ReactNode}) {

  const [searchString, setSearchString] = useState("")
  const [user, setUser] = useState<TVendor | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)


  useEffect(() => {
    checkUser().then((res) => {
      if(res) {
        setUser({id: res.payload.id, email: res.payload.email, name: res.payload.name, phone: res.payload.phone})
      }
    })
  },[])

  return (
     <AppContext.Provider value={{searchString, setSearchString, user, setUser, error, setError, success, setSuccess, cartCount, setCartCount}}>
       {children}
     </AppContext.Provider>
  )
}