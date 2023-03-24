"use client"
import { AppContext } from '@/utils/context/appContextProvider'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useContext } from 'react'
import {GiShoppingCart} from 'react-icons/gi'


const homeRegex = /^\/product\/[a-z\d]+|\/$/

export default function Navbar() {
  const pathname = usePathname()
  const {user, setUser} = useContext(AppContext)!
  
  const isHomePath = homeRegex.test(pathname)

  const handleLogout = async () => {
    setUser(null)
  }


  return (
    <div className='inline-flex w-full h-28 px-5'>
      <div className='flex flex-1 justify-start items-center'>
        <Image src='http://localhost:3000/shopi_logo.png' alt='logo' width='70' height='70'/>
      </div>
      <nav className='flex flex-1 justify-center items-center'>
        <ul className='flex items-center justify-center gap-x-1 w-max h-full text-slate-300 md:gap-x-5'>
          <Link href='/' className={`py-1 px-4 rounded text-sm font-extrabold ${isHomePath ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Home</Link>
          {user?.name ? 
          <div className="py-1 px-4 rounded text-sm font-extrabold cursor-pointer active:bg-slate-800 active:text-white transition-colors" onClick={handleLogout}>Logout</div> :
          <Link href='/login' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/login' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Login</Link>}
          <Link href='/register' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/register' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Register</Link>
          <Link href='/secrete-page' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/secrete-page' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Secrete Page</Link>
        </ul>
      </nav>
      <div className='flex flex-1 justify-end items-center gap-x-5'>
        {user?.name && <p className='capitalize'>Hi, {user?.name}</p>}
        <div className='grid place-content-center h-10 w-10 bg-slate-800 rounded-full'>
         <GiShoppingCart className='text-lg cursor-pointer text-slate-300 hover:text-white transition-colors'/>
        </div>
      </div>
    </div>
  )
}
