import React from 'react'


export default async function SecretePage() {

  const content = (text: string) => (
    <div className='w-max -full mx-auto pt-20 flex-col justify-center'>
     <p className='text-center text-2xl mb-4 text-slate-300'>{text}</p>
    </div>
  )
  

  return content("This is a super secrete page!")
}
