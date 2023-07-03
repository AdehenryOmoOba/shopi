"use client"
import { AppContext } from '@/utils/context/appContextProvider'
import {MdError} from 'react-icons/md'
import {IoMdCheckmarkCircle} from 'react-icons/io'
import React, { useContext } from 'react'


let timeoutID: NodeJS.Timeout;

export function useNotification() {

  const context = useContext(AppContext)

  const notify = (payload: TNotify, delay = 5000) => {
    
    clearTimeout(timeoutID)
    
    if(payload.type === "error") context?.setError(payload.message)
    
    if(payload.type === "success") context?.setSuccess(payload.message)
    
    timeoutID = setTimeout(() => {
      context?.setError(null)
      context?.setSuccess(null)
    }, delay);
  }
  return notify
}


export default function Notification() {

  const {error, success} =  useContext(AppContext)
  

  const content =  (<div className={`fixed flex shadow-lg bg-gray-900 space-x-2 h-14 w-max rounded-md mx-auto bottom-16  items-center justify-center px-10 left-1/2 -translate-x-1/2 ${error || success ? "flex" : "hidden"}`}>
                    {success ? <IoMdCheckmarkCircle className='text-green-300 text-2xl'/> : <MdError className='text-red-600 text-2xl'/>}
                    <p>{success ? success : error}</p>
                  </div>) 
  
  if(error || success){
    return content
  }else{
    return null
  }
}
