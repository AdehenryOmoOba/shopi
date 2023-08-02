"use client"
import React,{useState} from 'react'
import {HiSearchCircle} from "react-icons/hi"
import SearchPopOver from '../searchPopOver/SearchPopOver'
import SearchBox from '../searchBox/SearchBox'


export default function SearchBar() {
  const [popOver, setPopOver] = useState(false)

  return (
    <div className='grid place-items-center w-full'>
        <button onClick={() => setPopOver(true)} className='flex items-center justify-center border border-slate-800 outline-slate-500 py-2 px-5 rounded-full gap-x-1 text-slate-400 shadow-lg'>
          <p>Search</p>
          <HiSearchCircle />
        </button>
        {popOver && <SearchPopOver popOver={popOver} setPopOver={setPopOver}>
            <SearchBox setPopOver={setPopOver}/>
          </SearchPopOver>
        }
    </div>
  )
}
