"use client"
import React, { useContext } from 'react'
import { AppContext } from '../../utils/context/appContextProvider'


export default function CartPage() {

  const context = useContext(AppContext)
  
  const content = (text: string) => (
    <div className='w-max -full mx-auto pt-20 flex-col justify-center'>
     <p className='text-center text-2xl mb-4 text-slate-300'>{text}</p>
     <div>
        <button onClick={() => context?.setCartCount((prev) => prev > 0 ? prev - 1 : prev )} className='py-1 px-4 bg-slate-700 mx-2 active:bg-slate-900 rounded'>-</button>
        <button onClick={() => context?.setCartCount((prev) => prev + 1)} className='py-1 px-4 bg-slate-700 mx-2 active:bg-slate-900 rounded'>+</button>
     </div>
    </div>
  )

 return content("Cart Page")
}