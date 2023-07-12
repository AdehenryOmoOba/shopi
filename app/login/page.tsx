"use client"
import Link from 'next/link'
import React, {useState, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useNotification } from '../components/notification/Notification'
import signIn from '@/utils/auth/login'
import { AppContext } from '@/utils/context/appContextProvider'
import Button from '../components/Button'
import { signIn as githubSignIn} from "next-auth/react"
import origin from '@/utils/origin'


export default function Login() {
  const [userData, setUserData] = useState({username: "", password: ""})
  const [isLoading, setIsLoading] = useState(false)
  const searcParams = useSearchParams()
  const notify = useNotification()
  const {setUser,setCartCount, user} = useContext(AppContext)
  const router = useRouter()
 
  const nexturl = searcParams.get('nexturl') ? `/${searcParams.get('nexturl')}` : '/'

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
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

  const handleGithubLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    await githubSignIn("github",{redirect: true, callbackUrl: origin})
  }

  const loginBtnStyle = "bg-blue-600 w-full rounded-md h-10 relative my-2"

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
        <Button name = "Login" action = {handleLogin} isLoading = {isLoading} btnStyles={loginBtnStyle} actionPayload="" />
        <button onClick={handleGithubLogin} className='bg-blue-600 w-full rounded-md h-10'>Login with GitHub</button>
      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>New to Shopi ?  <Link href='/register' className='text-blue-400'> Create an account</Link></p>
      </div>
    </div>
  )

  return content
}
