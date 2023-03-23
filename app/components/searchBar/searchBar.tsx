"use client"
import { SearchContext } from '@/utils/context/searchContext'
import React,{useContext} from 'react'

export default function SearchBar() {
  const contextValue =  useContext(SearchContext)

  return (
    <div className='w-full grid items-center mt-5 h-10'>
        <input type="text"
         placeholder='Search Product'
         value={contextValue?.searchString}
         onChange={(e) => contextValue?.setSearchString(e.target.value)}
         className="w-11/12 h-full py-2 rounded-full px-4 bg-gray-800 mx-auto md:w-1/2 lg:w-5/12"
        />
    </div>
  )
}
