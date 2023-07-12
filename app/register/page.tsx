"use client"
import Link from 'next/link'
import React,{useState} from 'react'
import axios from 'axios'
import { useNotification } from '../components/notification/Notification'
import { useRouter } from 'next/navigation'
import Button from '../components/buttons/Button'
import origin from '@/utils/origin'
import SocialButton from '../components/buttons/SocialButton'
import { FcGoogle } from 'react-icons/fc'
import { FaGithub } from 'react-icons/fa'


export default function Register() {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)
  const [googleIsLoading, setGoogleIsLoading] = useState(false)
  const [githubIsLoading, setGithubIsLoading] = useState(false)
  const notify = useNotification()
  const router = useRouter()

  const updateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.currentTarget.name]: e.currentTarget.value})
  }

  const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    setIsLoading(true)
    try {
      await axios.post(`${origin}api/register`, user)
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

  const handleGoogleRegister = () => {
    console.log("handleGoogleRegister...")
  }

  const handleGithubRegister = () => {
    console.log("handleGithubRegister...")
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
        <Button action = {register} isLoading = {isLoading}>
          <p>Register</p>
        </Button>

        <div className='flex flex-col bg-transparent h-max rounded-md py-2 relative'>
          <p className='text-center text-xs text-slate-400'>OR</p>
          <SocialButton action = {handleGoogleRegister} isLoading = {googleIsLoading}>
            <FcGoogle  className='relative top-1/2 translate-y-1/4'/>
            <p className='w-max'>Register with Google</p>
          </SocialButton>
          <SocialButton action = {handleGithubRegister} isLoading = {githubIsLoading}>
            <FaGithub className='relative top-1/2 translate-y-1/4'/>
            <p className='w-max'>Register with GitHub</p>
          </SocialButton>
        </div>

      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>Have an account already ? <Link href='/login' className='text-blue-400'> Login</Link></p>
      </div>
    </div>
  )
}



