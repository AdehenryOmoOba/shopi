"use client"
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {GiShoppingCart} from 'react-icons/gi'


const homeRegex = /^\/product\/[a-z\d]+|\/$/

export default function Navbar() {
const pathname = usePathname()
const isHomePath = homeRegex.test(pathname)


  return (
    <div className='inline-flex h-28 w-screen px-5'>
      <div className='flex flex-1 justify-start items-center'>
        <Image src='http://localhost:3000/shopi_logo.png' alt='logo' width='70' height='70'/>
      </div>
      <nav className='flex flex-1 justify-center items-center'>
        <ul className='flex items-center justify-center gap-x-2 w-full h-full text-slate-300 md:gap-x-4 lg:gap-x-10'>
          <Link href='/' className={`py-1 px-4 rounded text-sm font-extrabold ${isHomePath ? 'bg-slate-800' : ''}`}>Home</Link>
          <Link href='/login' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/login' ? 'bg-slate-800' : ''}`}>Login</Link>
          <Link href='/register' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/register' ? 'bg-slate-800' : ''}`}>Register</Link>
        </ul>
      </nav>
      <div className='flex flex-1 justify-end items-center'>
        <div className='grid place-content-center h-10 w-10 bg-slate-800 rounded-full hover:poi'>
         <GiShoppingCart className='text-lg cursor-pointer text-slate-300'/>
        </div>
      </div>
    </div>
  )
}
