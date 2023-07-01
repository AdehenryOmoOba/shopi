"use client"
import { useRouter } from 'next/navigation'
import React, { useEffect, useState } from 'react'


function CountDown() {
  const [count, setCount] = useState(3)
  const router = useRouter()




  useEffect(() => {

     let timeoutID = setTimeout(() => {
            if(count > 0) setCount((prev) => prev - 1)
        },1000)
    
        let timeoutID2: NodeJS.Timer | null = null
        if(count === 0) {
          timeoutID2 = setTimeout(() => {
            router.push("/")
          }, 500);
        }

        return () => {
          clearInterval(timeoutID)
          clearInterval(timeoutID2)
        }
  }, [count])

  return (
    <div className='flex flex-col items-center'>
        <p className='text-slate-500 mb-10'>Redirecting to home page in...</p>
        <p className='text-slate-500 text-9xl font-extrabold'>{count}</p>
    </div>
  )
}

export default CountDown