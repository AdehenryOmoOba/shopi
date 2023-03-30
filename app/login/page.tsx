"use client"
import Link from 'next/link'
import React, {useState, useContext } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { useNotification } from '../components/notification/Notification'
import signIn from '@/utils/auth/login'
import { AppContext } from '@/utils/context/appContextProvider'


export default function Login() {
  const [userData, setUserData] = useState({username: "", password: ""})
  const searcParams = useSearchParams()
  const notify = useNotification()
  const {setUser, user} = useContext(AppContext)
  const router = useRouter()

  
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log(searcParams.get('nexturl'))
    const nexturl = searcParams.get('nexturl') ? `/${searcParams.get('nexturl')}` : '/'

    const response = await signIn(userData)
    if(!response.success) notify({type: 'error', message: response.error})
    if(response.success) {
      notify({type: 'success', message: "Login successful"})
      setUser(response.data)
      router.push("/")
    } 
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
        <button className='bg-blue-600 w-full rounded-md h-10 mb-5' onClick={handleLogin}>Login</button>
        <button className='bg-blue-600 w-full rounded-md h-10'>Login with Google</button>
      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>New to Shopi ?  <Link href='/register' className='text-blue-400'> Create an account</Link></p>
      </div>
    </div>
  )

  return content
}