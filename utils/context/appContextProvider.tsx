"use client"
import { Product } from '@prisma/client'
import React, { useState, useEffect } from 'react'
import { checkUser } from '../auth/checkUser'


interface IAppContext {
  searchString: string 
  setSearchString: React.Dispatch<React.SetStateAction<string>>
  setUser: React.Dispatch<React.SetStateAction<User | null>>
  user: User | null
  error: string | null
  setError: React.Dispatch<React.SetStateAction<string | null>>
  success: string | null
  setSuccess: React.Dispatch<React.SetStateAction<string | null>>
  cartCount: number
  setCartCount: React.Dispatch<React.SetStateAction<number>>
  updateCartCount: () => number
}

export const AppContext = React.createContext<IAppContext | null>(null)

export default function AppContextProvider({children}: {children: React.ReactNode}) {

  const [searchString, setSearchString] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)

  useEffect(() => {
    // Persist current user state 
    checkUser().then((res) => {
      if(res) {
        const curretUser = res.payload.user as User
        setUser({...curretUser})
        let count = 0;
        for (let item of curretUser.cart) {
          count += item.count
        }
        setCartCount(count)
      }
    })

  },[])

  const updateCartCount = () => {
    let count = 0;
    for (let item of user.cart) {
      count += item.count
    }
    return count
  }

  return (
     <AppContext.Provider value={{searchString, setSearchString, user, setUser, error, setError, success, setSuccess, cartCount, setCartCount, updateCartCount}}>
       {children}
     </AppContext.Provider>
  )
}