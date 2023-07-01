"use client"
import { AppContext } from "@/utils/context/appContextProvider"
import { debouncedCartSync } from "@/utils/debouncedCartSync"
import {useContext, useEffect} from "react"
import {IoMdCheckmarkCircleOutline} from "react-icons/io"
import CountDown from "../components/countDown/CountDown"


export default function PaymentCompleted() {
  const {user,setCartCount, setCartTotal} = useContext(AppContext)

  useEffect(() => {
    if(user) {
      setCartCount(0)
      setCartTotal(0)
      user.cart = []
      debouncedCartSync({id: user.id, cart: []})
    }
  },[user])

  const content = (text: string) => (
    <div>
     <div className='flex w-max mx-auto mt-20 mb-40 justify-center h-max items-center gap-x-2'>
      <p className='text-center text-2xl text-slate-300'>{text}</p>
      <IoMdCheckmarkCircleOutline  className="place-self-center text-3xl text-green-500" />
     </div>
     <CountDown />
    </div>
  )

  return content("Payment Completed")
}