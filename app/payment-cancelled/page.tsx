"use client"
import {FcCancel} from "react-icons/fc"
import CountDown from "../components/countDown/CountDown"


export default function PaymentCancelled() {

  const content = (text: string) => (
    <div>
     <div className='flex w-max mx-auto mt-20 mb-40 justify-center h-max items-center gap-x-2'>
      <p className='text-center text-2xl text-slate-300'>{text}</p>
      <FcCancel  className="place-self-center text-4xl"/>
     </div>
     <CountDown />
    </div>
  )

  return content("Payment Cancelled")
}