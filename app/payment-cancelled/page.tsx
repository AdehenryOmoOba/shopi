"use client"
import {FcCancel} from "react-icons/fc"

export default function PaymentCancelled() {

  const content = (text: string) => (
    <div className='flex w-max mx-auto mt-20 justify-center h-max items-center gap-x-2'>
     <p className='text-center text-2xl text-slate-300'>{text}</p>
     <FcCancel  className="place-self-center text-4xl"/>
    </div>
  )

  return content("Payment Cancelled")
}