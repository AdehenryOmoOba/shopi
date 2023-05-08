"use client"
import Link from 'next/link'
import React,{useState} from 'react'
import axios from 'axios'


export default function Register() {
  const [user, setUser] = useState({})
  const [isLoading, setIsLoading] = useState(false)

  const updateUser = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser({...user, [e.currentTarget.name]: e.currentTarget.value})
  }

  // {
  //   "name": "Duro Ibrahim",
  //   "email": "duro@gmail.com", 
  //   "phone": "08034444444",
  //   "password": "123"
  // }

  const register = async (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault()
    const response = await axios.post('http://localhost:3000/api/register', user)
    console.log("server response: " ,response.data)
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
        <button onClick={register} className='bg-blue-600 w-full rounded-md h-10'>Register</button>
      </form> 
      <div className='h-16 grid place-content-center rounded-md border border-slate-600'>
        <p>Have an account already ? <Link href='/login' className='text-blue-400'> Login</Link></p>
      </div>
    </div>
  )
}



