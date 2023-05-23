"use client"
import React, { useContext } from 'react'
import { AppContext } from '../../utils/context/appContextProvider'


export default function CartPage() {

  const context = useContext(AppContext)
  
  const content = (text: string) => (
    <div className='w-max -full mx-auto pt-20 flex-col justify-center'>
     <p className='text-center text-2xl mb-4 text-slate-300'>{text}</p>
     <div>
        <button  className='py-1 px-4 bg-slate-700 mx-2 active:bg-slate-900 rounded'>-</button>
        <button  className='py-1 px-4 bg-slate-700 mx-2 active:bg-slate-900 rounded'>+</button>
     </div>
    </div>
  )

 return content("Cart Page")
}