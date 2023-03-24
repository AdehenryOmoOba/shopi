"use client"
import { AppContext } from '@/utils/context/appContextProvider'
import React,{useContext} from 'react'

export default function SearchBar() {
  const {searchString, setSearchString} =  useContext(AppContext)!

  return (
    <div className='w-full grid items-center mb-5 h-10'>
        <input type="search"
         placeholder='Search Product'
         value={searchString}
         onChange={(e) => setSearchString(e.target.value)}
         className="w-11/12 h-full py-2 rounded-full px-4 bg-gray-800 mx-auto md:w-1/2 lg:w-5/12 outline-none focus:outline-slate-700 "
        />
    </div>
  )
}
