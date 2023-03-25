"use client"
import { AppContext } from '@/utils/context/appContextProvider'
import React, { useContext } from 'react'

export function useNotification() {
    const {setError, setSuccess} = useContext(AppContext)!

    const notify = (payload: TNotify) => {
        if(payload.type === "error") setError(payload.message)
        if(payload.type === "success") setSuccess(payload.message)
    
        const timeoutID =  setTimeout(() => {
                           setError(null)
                           setSuccess(null)
                         }, 3000);
    
        return () => clearTimeout(timeoutID)
      }

      return notify
}


export default function Notification() {
  const {error, success} = useContext(AppContext)!

// const success = "notify"
// const error = null

  return (
    <div className={`fixed h-10 w-max rounded-full mx-auto bottom-16  items-center justify-center px-10 left-1/2 -translate-x-1/2 ${error || success ? "flex" : "hidden"} ${success ? "bg-green-400 text-slate-800" : "bg-red-500 text-white"}`}>
      <p>{success}{error}</p>
    </div>
  )
}
