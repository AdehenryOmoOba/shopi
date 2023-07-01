"use client"
import {IoMdCheckmarkCircleOutline} from "react-icons/io"

export default function PaymentCompleted() {

  const content = (text: string) => (
    <div className='flex w-max mx-auto mt-20 justify-center h-max items-center gap-x-2'>
     <p className='text-center text-2xl text-slate-300'>{text}</p>
     <IoMdCheckmarkCircleOutline  className="place-self-center text-3xl text-green-500"/>
    </div>
  )

  return content("Payment Completed")
}