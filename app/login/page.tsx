"use client"
import Link from 'next/link'
import React, {useState, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useNotification } from '../components/notification/Notification'
import signIn from '@/utils/auth/login'
import { AppContext } from '@/utils/context/appContextProvider'
import Button from '../components/buttons/Button'
import { signIn as githubSignIn, signIn as googleSignIn} from "next-auth/react"
import origin from '@/utils/origin'
import {FcGoogle} from "react-icons/fc"
import {FaGithub} from "react-icons/fa"
import SocialButton from '../components/buttons/SocialButton'


export default function Login() {
  const [userData, setUserData] = useState({username: "", password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const [googleIsLoading, setGoogleIsLoading] = useState(false)
  const [githubIsLoading, setGithubIsLoading] = useState(false)
  const searcParams = useSearchParams()
  const notify = useNotification()
  const {setUser,setCartCount, user} = useContext(AppContext)
  const router = useRouter()
 
  const nexturl = searcParams.get('nexturl') ? `/${searcParams.get('nexturl')}` : '/'

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()

    if(!userData.username || !userData.password) return

    setIsLoading(true)

    try {
      const response = await signIn(userData)

      setIsLoading(false)
  
      if(!response.success) {
        let errorMsg: string = response.error.length > 30 || response.error === "Failed to fetch" ? "Oops! Network error.": response.error
        notify({type: 'error', message: errorMsg})
        return
      }
  
      notify({type: 'success', message: "Login successful"})
      setUser(response.data.user)
      let count = 0;
      for (let item of response.data.user.cart) {
        count += item.count
      }
      setCartCount(count)
      router.push(nexturl)
    } catch (error) {
      notify({type: 'error', message: "Oops! Network error."})
    }
  }

  const handleGoogleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setGoogleIsLoading(true)
    console.log("Google login...")
    window.localStorage.setItem("current-provider", "Google")
    await googleSignIn("google",{redirect: true, callbackUrl: origin})
  }

  const handleGithubLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setGithubIsLoading(true)
    console.log("GitHub login...")
    window.localStorage.setItem("current-provider", "GitHub")
    await githubSignIn("github",{redirect: true, callbackUrl: origin})
  }

  const content = (
    <div className='w-[280px] h-full mx-auto pt-20 flex-col justify-center lg:w-[308px]'>
      <p className='text-center text-2xl mb-4 text-slate-300'>Login to Shopi</p>
      <form className='bg-slate-900 rounded-md p-5 mb-4' autoComplete='false'>
        <div className='mb-4'>
          <div className='w-full mb-2'><p>Username</p></div>
          <input type="text" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800' role="presentation" value={userData.username} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, username: e.target.value})} />
        </div>
        <div className='mb-4'>
        <div className='w-full mb-2'><p>Password</p></div>
          <input type="password" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800' role="presentation" value={userData.password} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUserData({...userData, password: e.target.value})} />
        </div>
        <Button action = {handleLogin} isLoading = {isLoading}  actionPayload="">
          <p className='font-extrabold'>Login</p>
        </Button>

        <div className='flex flex-col bg-transparent h-max rounded-md py-2 relative'>
          <p className='text-center text-xs text-slate-400'>OR</p>
          <SocialButton action = {handleGoogleLogin} isLoading = {googleIsLoading}>
            <FcGoogle  className='relative top-1/2 translate-y-1/4'/>
            <p className='w-max'>Login with Google</p>
          </SocialButton>
          <SocialButton action = {handleGithubLogin} isLoading = {githubIsLoading}>
            <FaGithub className='relative top-1/2 translate-y-1/4'/>
            <p className='w-max'>Login with GitHub</p>
          </SocialButton>
        </div>

      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>New to Shopi ?  <Link href='/register' className='text-blue-400'> Create an account</Link></p>
      </div>
    </div>
  )

  return content
}
