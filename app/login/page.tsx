"use client"
import { AppContext } from '@/utils/context/appContextProvider'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { useContext, useState } from 'react'


const hardToken = "bh90345894@&*#*#*()))_*&JJ&U&"

export default function Login() {
  
  const [userData, setUserData] = useState({username: "", password: ""})
  const {setUser, setError} = useContext(AppContext)!
  const router = useRouter()

  const handleLogin = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {

    e.preventDefault()
 
    try {
      const response = await fetch('http://localhost:3000/api/auth/login', {method: "POST", body: JSON.stringify(userData)})
      const data: TLoginResponse = await response.json()
      console.log(data)
      if(data.success && data.jwt === hardToken) setUser(data.user)
      router.push('/')
    } catch (error: any) {
      console.log(error.message)
      setError(error.message)
    }
  }


  return (
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
}
