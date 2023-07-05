"use client"
import React, { useState, useEffect } from 'react'
import { checkUser } from '../auth/checkUser'
import { debouncedCartSync } from '../debouncedCartSync'


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
  updateCartCount: () => {count: number, total: number}
  addItemToCart:  (data: TProductDetails) => void
  decrementCartCount:  (data: {itemId: string, itemName: string}) => void
  deleteCartItem:  (data: {itemId: string, itemName: string}) => void
  clearCart:  () => void
  cartTotal: number
  setCartTotal: React.Dispatch<React.SetStateAction<number>>
}

export const AppContext = React.createContext<IAppContext | null>(null)

export default function AppContextProvider({children}: {children: React.ReactNode}) {

  const [searchString, setSearchString] = useState("")
  const [user, setUser] = useState<User | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)
  const [cartCount, setCartCount] = useState(0)
  const [cartTotal, setCartTotal] = useState(0)

  useEffect(() => {
    (async () => {
    const response = await checkUser()

    if(response.error) {
     return
    }

    const curretUser = response as User
    
    setUser({...curretUser})

    let count = 0;
    let total = 0

    for (let item of curretUser.cart) {
      count += item.count
      total += parseFloat(item.item.price) * item.count
    }

    setCartCount(count)
    setCartTotal(total)

    })()
  },[])

  const updateCartCount = () => {
    let count = 0;
    let total = 0

    if(user){
      for (let item of user.cart) {
        count += item.count
        total += parseFloat(item.item.price) * item.count
      }
    }

    return {count, total}
  }

  const addItemToCart = (data: TProductDetails) => {
        
    let duplicateIndex: number;
  
    if(!user) {
      alert("Please login before adding items to cart.")
      return
    }
  
    let isDuplicate = user.cart.some((item, index) => {
      if (item.item.id === data.id) {
        duplicateIndex = index
      }
      return item.item.id === data.id
    })
  
    if (isDuplicate) {
      user.cart[duplicateIndex].count++
      setUser({...user})
    }else{
      user.cart.push({item: data, count: 1})
      setUser({...user})
    }
    
    setCartCount(updateCartCount().count)
    setCartTotal(updateCartCount().total)

    debouncedCartSync({id: user.id, cart: user.cart})
  }

  const decrementCartCount = ({itemId, itemName}: {itemId: string, itemName: string}) => {

    let itemIndex: number
        
    let item = user.cart.find(({item}, index) => {
      itemIndex = index
      return item.id === itemId
    })
  
    if (item.count > 1) {
      user.cart[itemIndex].count--
      setUser({...user})
    }else{
      user.cart.splice(itemIndex,1)
      setUser({...user})
    }
    
    setCartCount(updateCartCount().count)
    setCartTotal(updateCartCount().total)
    
    debouncedCartSync({id: user.id, cart: user.cart})
  }

  const deleteCartItem = (itemInfo: {itemId: string, itemName: string}) => {

    let itemIndex: number
        
    user.cart.find(({item}, index) => {
      itemIndex = index
      return item.id === itemInfo.itemId
    })
  
      user.cart.splice(itemIndex,1)
      setUser({...user})
    
    setCartCount(updateCartCount().count)
    setCartTotal(updateCartCount().total)
    
    debouncedCartSync({id: user.id, cart: user.cart})
  }

  const clearCart = () => {

    user.cart = []
    
    setUser({...user})
    
    setCartCount(0)
    setCartTotal(0)
    
    debouncedCartSync({id: user.id, cart: user.cart})
  }

  return (
     <AppContext.Provider value={{searchString, setSearchString, user, setUser, error, setError, success, setSuccess, cartCount, setCartCount, updateCartCount, addItemToCart, decrementCartCount, deleteCartItem, clearCart, cartTotal, setCartTotal}}>
       {children}
     </AppContext.Provider>
  )
}

