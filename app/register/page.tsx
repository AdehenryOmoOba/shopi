import Link from 'next/link'
import React from 'react'

export default function Register() {
  return (
    <div className='w-[308px] mx-auto mt-10 flex-col justify-center'>
      <p className='text-center text-2xl mb-4 text-slate-300'>Register</p>
      <form className='bg-slate-900 rounded-md p-5 mb-4'>
        <div className='mb-4'>
          <div className='w-full mb-2'><p>Username</p></div>
          <input type="text" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800'/>
        </div>
        <div className='mb-4'>
        <div className='w-full mb-2'><p>Password</p></div>
          <input type="password" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800'/>
        </div>
        <button className='bg-blue-600 w-full rounded-md h-10'>Register</button>
      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>Have an account already? <Link href='/login' className='text-blue-400'>Login</Link></p>
      </div>
    </div>
  )
}



