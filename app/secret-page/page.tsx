import { getServerSession } from 'next-auth'
import { redirect } from 'next/navigation'
import React from 'react'
import { authOptions } from '../api/auth/[...nextauth]/route'


export default async function SecretePage() {

   const session =  await getServerSession(authOptions)

  const content = (text: string) => (
    <div className='w-max -full mx-auto pt-20 flex-col justify-center'>
     <p className='text-center text-2xl mb-4 text-slate-300'>{text}</p>
    </div>
  )
  
  if(session) return content("This is a super secrete page!")

  if(!session) redirect('/login?nexturl=secret-page')
}
