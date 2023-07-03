"use client"
import Link from 'next/link'
import React,{useState} from 'react'
import axios from 'axios'
import { useNotification } from '../components/notification/Notification'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'


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
      console.log(error)
      setIsLoading(false)
      const errorMsg = error.response.data.error
      notify({type: "error", message: errorMsg})
    }
  }

  const registerBtnStyle = "bg-blue-600 w-full rounded-md h-10 relative my-2"

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
        <Button name = "Register" action = {register} btnStyles={registerBtnStyle} isLoading = {isLoading} actionPayload=""/>
      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>Have an account already ? <Link href='/login' className='text-blue-400'> Login</Link></p>
      </div>
    </div>
  )
}



