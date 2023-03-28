"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React from 'react'
import {GiShoppingCart} from 'react-icons/gi'
import { CldImage } from 'next-cloudinary'
import {signOut, signIn} from 'next-auth/react'
import {useSession} from 'next-auth/react'


const homeRegex = /^\/product\/[a-z\d]+|\/$/
const logoURL = "https://firebasestorage.googleapis.com/v0/b/ecommerce-f8b0d.appspot.com/o/images%2Fshopi_logo.png?alt=media&token=930520f4-d5fc-4bbb-aed6-00b92a4ac953"

function Navbar() {
 
  const pathname = usePathname()
  const {data, status} = useSession()
  
  const isHomePath = homeRegex.test(pathname)

  const handleLogout =  () => {
     signOut()
  }
  
  console.log({data})

  return (
    <div className='inline-flex w-full h-28 px-5'>
      <div className='flex flex-1 justify-start items-center'>
        <CldImage deliveryType='fetch' src={logoURL} alt="web-logo" width="65"  height="65" loading='lazy' style={{width: "auto"}}/>
      </div>
      <nav className='flex flex-1 justify-center items-center'>
        <ul className='flex items-center justify-center gap-x-1 w-max h-full text-slate-300 md:gap-x-5'>
          <Link href='/' className={`py-1 px-4 rounded text-sm font-extrabold ${isHomePath ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Home</Link>
          {status === "authenticated" ? 
          <button className="py-1 px-4 rounded text-sm font-extrabold cursor-pointer active:bg-slate-800 active:text-white transition-colors" onClick={handleLogout}>Logout</button> :
          <Link href='/login' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/login' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Login</Link>}
          <Link href='/register' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/register' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Register</Link>
          <Link href='/secret-page' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/secrete-page' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Secrete Page</Link>
        </ul>
      </nav>
      <div className='flex flex-1 justify-end items-center gap-x-5'>
        {status === "authenticated" ? <p className='capitalize'>Hi, {data.user.name}</p> : <p className='capitalize'>Hi, guest</p>}
        <div className='grid place-content-center h-10 w-10 bg-slate-800 rounded-full'>
         <GiShoppingCart className='text-lg cursor-pointer text-slate-300 hover:text-white transition-colors'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar