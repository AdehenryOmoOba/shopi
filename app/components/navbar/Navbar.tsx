"use client"
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import React,{useContext, useState} from 'react'
import {GiShoppingCart} from 'react-icons/gi'
import {MdClose} from 'react-icons/md'
import {RxHamburgerMenu} from 'react-icons/rx'
import { CldImage } from 'next-cloudinary'
import { AppContext } from '@/utils/context/appContextProvider'
import { signOut } from '@/utils/auth/logout'
import { useNotification } from '../notification/Notification'
import { signOut as githubSignOut } from 'next-auth/react'
import origin from '@/utils/origin'


const homeRegex = /^\/product\/[a-z\d]+|\/$/
const logoURL = "https://firebasestorage.googleapis.com/v0/b/ecommerce-f8b0d.appspot.com/o/images%2Fshopi_logo.png?alt=media&token=930520f4-d5fc-4bbb-aed6-00b92a4ac953"

export default function Navbar() {
 
  const pathname = usePathname()
  const {user, setUser, cartCount, setCartCount} = useContext(AppContext);
  const notify = useNotification()
  const router = useRouter()
  const [isOpen, setisOpen] = useState(false)
  

  const isHomePath = homeRegex.test(pathname)

  const  handleLogout = async () => {
    try {
      await githubSignOut({redirect: false})
      const response = await signOut()
      console.log("response from Signout...Navbar:", response)
      setUser(null)
      setCartCount(0)
      notify({type: 'success', message: response.success})
      router.push(origin)
    } catch (error) {
      notify({type: 'error', message: error.message})
    }
  }

  const toggleMenu = ()  => {
    setisOpen((prev) => !prev)
  }

  const navLinks = () => (<nav className="hidden md:flex md:flex-1 md:justify-center md:items-center">
                           <ul className='flex items-center justify-center gap-x-1 w-max h-full text-slate-400 md:gap-x-5 font-extrabold'>
                             <Link href='/' className={`py-1 px-4 rounded font-extrabold ${isHomePath ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Home</Link>
                             <Link href='/secret-page' className={`py-1 px-4 rounded font-extrabold ${pathname === '/secrete-page' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Secrete Page</Link>
                             {!!user && <Link href='/cart' className={`py-1 px-4 rounded font-extrabold ${pathname === '/cart' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>View Cart</Link>}
                             {!user && <Link href='/register' className={`py-1 px-4 rounded font-extrabold ${pathname === '/register' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Register</Link>}
                             {user ? <button onClick={handleLogout} className="py-1 px-4 rounded font-extrabold cursor-pointer active:bg-slate-800 active:text-white transition-colors" >Logout</button> : <Link href='/login' className={`py-1 px-4 rounded font-extrabold ${pathname === '/login' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Login</Link>}
                           </ul>
                         </nav>)

  const slideNavLinks = () => (<nav className="flex flex-col justify-center">
                           <ul className='flex flex-col items-start justify-start gap-y-10 w-max h-full text-slate-400 md:gap-x-5 font-extrabold'>
                             <Link href='/' className={`py-1 px-4 rounded font-extrabold ${isHomePath ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Home</Link>
                             <Link href='/secret-page' className={`py-1 px-4 rounded font-extrabold ${pathname === '/secrete-page' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Secrete Page</Link>
                             {!!user && <Link href='/cart' className={`py-1 px-4 rounded font-extrabold ${pathname === '/cart' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>View Cart</Link>}
                             {!user && <Link href='/register' className={`py-1 px-4 rounded font-extrabold ${pathname === '/register' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Register</Link>}
                             {user ? <button onClick={handleLogout} className="py-1 px-4 rounded font-extrabold cursor-pointer active:bg-slate-800 active:text-white transition-colors" >Logout</button> : <Link href='/login' className={`py-1 px-4 rounded text-sm font-extrabold ${pathname === '/login' ? 'bg-slate-800 text-white' : ''} hover:text-white transition-colors`}>Login</Link>}
                           </ul>
                         </nav>)


  return (
    <div className='fixed w-[100vw] top-0 left-0 right-0 inline-flex  mx-auto h-28 px-5 bg-[#00000b] z-10 md:w-[80vw]'>
      <div onClick={() => setisOpen((prev) => !prev)}  className={`slideMenu fixed flex flex-col pt-10 pl-5 top-28 right-0 bottom-0 ${isOpen ? "w-1/2":"w-0"} backdrop-blur-lg md:hidden`}>
       {slideNavLinks()}
      </div>
      <div className='flex flex-1 justify-start items-center'>
        <CldImage deliveryType='fetch' src={logoURL} alt="web-logo" width="65"  height="65" loading='lazy' style={{width: "auto"}}/>
      </div>
      {navLinks()}
      <div className='flex flex-1 justify-end items-center gap-x-5 w-max'>
        <p className='capitalize w-max'>Hi, {user ? user.username : "Guest"}</p>
        <div className='grid relative place-content-center h-10 w-10 bg-slate-800 rounded-full'>
        {!!cartCount && <div className='grid absolute place-content-center -top-2 -right-2 h-6 w-6 bg-blue-600 rounded-full'>
            <p className='grid place-content-center leading-6 text-xs w-6 rounded-full'>{cartCount}</p>
          </div>}
         <GiShoppingCart className='text-lg cursor-pointer text-slate-300 hover:text-white transition-colors'/>
        </div>
      </div>
      <div onClick={toggleMenu} className='flex flex-1 justify-end items-center md:hidden'>
        {isOpen ? <MdClose  className='text-white text-3xl cursor-pointer'/> : <RxHamburgerMenu  className='text-white text-3xl cursor-pointer'/>}
      </div>
    </div>
  )
}