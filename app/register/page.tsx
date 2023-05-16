"use client"
import Link from 'next/link'
import React,{useState} from 'react'
import axios from 'axios'
import { useNotification } from '../components/notification/Notification'
import { useRouter } from 'next/navigation'


export default function Register() {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const notify = useNotification()
  const router = useRouter()

  const updateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.currentTarget.name]: e.currentTarget.value})
  }

  const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post('http://localhost:3000/api/register', user)
      setIsLoading(false)
      notify({type: "success", message: "Registration successful"})
      router.push("/login")
    } catch (error: any) {
      setIsLoading(false)
      const errorObj = JSON.parse(error.response.data.error)
      notify({type: "error", message: errorObj[0].message})
    }
  }

  return (
    <div className='w-[280px] mx-auto pt-20 flex-col justify-center lg:w-[308px]'>
      <p className='text-center text-2xl mb-4 text-slate-300'>Register</p>
      <form className='bg-slate-900 rounded-md p-5 mb-4' autoComplete='off'>
        <div className='mb-4'>
          <div className='w-full mb-2'><p>Username</p></div>
          <input type="text" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800' autoComplete="none" name='username' onChange={updateUser}/>
        </div>
        <div className='mb-4'>
          <div className='w-full mb-2'><p>Email</p></div>
          <input type="email" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800' autoComplete="none" name='email' onChange={updateUser}/>
        </div>
        <div className='mb-4'>
          <div className='w-full mb-2'><p>Phone</p></div>
          <input type="text" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800' autoComplete="none" name='phone' onChange={updateUser}/>
        </div>
        <div className='mb-4'>
        <div className='w-full mb-2'><p>Password</p></div>
          <input type="password" className='w-full h-10 rounded-md bg-black px-2 border border-slate-800' autoComplete="none" name='password' onChange={updateUser}/>
        </div>
        <button onClick={register} className='bg-blue-600 w-full rounded-md h-10 relative'>
          <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isLoading ? "opacity-0" : "opacity-100" }`}>Register</p>
          <svg className={`absolute left-1/2 top-1/4 -translate-x-1/2 -rotate-[360] w-5 h-5 mr-3 -ml-1 text-white animate-spin ${isLoading ? "opacity-100" : "opacity-0" }`} xmlns="http://www.w3.org/2000/svg" fill="none"
            viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path className="opacity-75" fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z">
            </path>
        </svg>
        </button>
      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>Have an account already ? <Link href='/login' className='text-blue-400'> Login</Link></p>
      </div>
    </div>
  )
}



