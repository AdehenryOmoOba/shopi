"use client"
import Link from 'next/link'
import React, {useState } from 'react'
import {signIn, useSession} from 'next-auth/react'
import { redirect, useSearchParams } from 'next/navigation'
import { useNotification } from '../components/notification/Notification'


export default function Login() {
  const session = useSession()
  const [userData, setUserData] = useState({username: "", password: ""})
  const searcParams = useSearchParams()
  const notify = useNotification()
  
  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    console.log(searcParams.get('nexturl'))
    const nexturl = searcParams.get('nexturl') ? `/${searcParams.get('nexturl')}` : '/'
    await signIn("credentials", {redirect: true, username: userData.username, password: userData.password, callbackUrl: nexturl })

    // const {error} = await signIn("credentials", {redirect: true, username: userData.username, password: userData.password, callbackUrl: '/' })
    // if(error) notify({type: "error", message: error})
    // if(!error) {
    //   notify({type:'success', message: "Login successful"})
    // }
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
  
  if(session.status === "unauthenticated") return content

  if(session.status === "loading") return <div className='w-[280px] h-full mx-auto pt-20 flex-col justify-center lg:w-[308px]'><p className='text-center'>Loading...</p></div>

  redirect('/')
}