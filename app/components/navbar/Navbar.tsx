"use client"
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React,{useContext} from 'react'
import {GiShoppingCart} from 'react-icons/gi'
import { CldImage } from 'next-cloudinary'
import { AppContext } from '@/utils/context/appContextProvider'
import { signOut } from '@/utils/auth/logout'
import { useNotification } from '../notification/Notification'


const homeRegex = /^\/product\/[a-z\d]+|\/$/
const logoURL = "https://firebasestorage.googleapis.com/v0/b/ecommerce-f8b0d.appspot.com/o/images%2Fshopi_logo.png?alt=media&token=930520f4-d5fc-4bbb-aed6-00b92a4ac953"

function Navbar() {
 
  const pathname = usePathname()
  const {user, setUser} = useContext(AppContext);
  const notify = useNotification()

  const isHomePath = homeRegex.test(pathname)

  const  handleLogout = async () => {
    const response = await signOut()
    if(response.error) return notify({type: 'error', message: response.error})
    setUser(null)
    notify({type: 'success', message: response.success})
  }

  return (
    <div className='inline-flex w-full h-28 px-5'>
      <div className='flex flex-1 justify-start items-center'>
        <CldImage deliveryType='fetch' src={logoURL} alt="web-logo" width="65"  height="65" loading='lazy' style={{width: "auto"}}/>
      </div>
      <nav className='flex flex-1 justify-center items-center'>
        <ul className='flex items-center justify-center gap-x-1 w-max h-full text-slate-300 md:gap-x-5'>
          <Link href='/' className={`py-1 px-4 rounded text-sm font-extrabold ${isHomePath ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Home</Link>
          <Link href='/secret-page' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/secrete-page' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Secrete Page</Link>
          <Link href='/cart' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/cart' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>View Cart</Link>
          {!user && <Link href='/register' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/register' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Register</Link>}
          {user ? <button className="py-1 px-4 rounded text-sm font-extrabold cursor-pointer active:bg-slate-800 active:text-white transition-colors" onClick={handleLogout}>Logout</button> : <Link href='/login' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/login' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Login</Link>}
        </ul>
      </nav>
      <div className='flex flex-1 justify-end items-center gap-x-5'>
        <p className='capitalize'>Hi, {user ? user.username : "Guest"}</p>
        <div className='grid relative place-content-center h-10 w-10 bg-slate-800 rounded-full'>
        {!!user?.cart?.length && <div className='grid absolute place-content-center -top-2 -right-2 h-6 w-6 bg-blue-600 rounded-full'>
            <p className='grid place-content-center leading-6 text-xs w-6 rounded-full'>{user?.cart?.length}</p>
          </div>}
         <GiShoppingCart className='text-lg cursor-pointer text-slate-300 hover:text-white transition-colors'/>
        </div>
      </div>
    </div>
  )
}

export default Navbar