"use client"
import React,{useState} from 'react'
import {HiSearchCircle} from "react-icons/hi"
import SearchPopOver from '../searchPopOver/SearchPopOver'
import SearchBox from '../searchBox/SearchBox'


export default function SearchBar() {
  const [popOver, setPopOver] = useState(false)

  return (
    <div className='grid place-items-center w-full'>
        <button onClick={() => setPopOver(true)} className='flex items-center justify-center border border-slate-700 outline-slate-300 py-2 px-5 rounded-full gap-x-1 text-white font-extrabold shadow-lg hover:border-white transition-colors'>
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
