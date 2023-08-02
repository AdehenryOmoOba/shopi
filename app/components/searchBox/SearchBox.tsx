"use client"
import styles from "./SearchBox.module.css"
import React,{useRef, useState, useEffect, KeyboardEvent} from 'react'
import {FiSearch} from "react-icons/fi"
import {AiFillCloseCircle} from "react-icons/ai"
import {GrAdd} from "react-icons/gr"
import {FaTrash} from "react-icons/fa"
import Image from "next/image"
import origin from "@/utils/origin"


const inputRegex = /^[A-Za-z0-9]+$/;
let setTimeoutID: NodeJS.Timeout;
let abortController = new AbortController()

type Prop = {
    setPopOver: React.Dispatch<React.SetStateAction<boolean>>
  }


function SearchBox({setPopOver}: Prop) {
    const popOverRef = useRef()
    const clearBtnRef = useRef()
    const [inputValue, setInputValue] = useState("")
    const [productsFound, setProductsFound] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [noMatch, setNoMatch] = useState(false)

    useEffect(() => {
        (
          async () => {
            debouncedSearchProducts(1000, inputValue)
          }
        )()
        if(!inputValue) setProductsFound([])
      }, [inputValue]);

      const fetchOptions = {
        method: "POST",
        body: JSON.stringify({searchString: inputValue}),
        signal: abortController.signal
      }

      function debouncedSearchProducts(time: number, inputValue: string) {

        if (setTimeoutID) clearTimeout(setTimeoutID)
      
        setTimeoutID = setTimeout(async () => {
          abortController.abort()
           await searchProducts(inputValue)
          }, time);
      }

      async function searchProducts(inputValue: string){

        if(!inputValue || !inputRegex.test(inputValue)) return
    
        setIsLoading(true)
      
        abortController = new AbortController()
      
        fetchOptions.signal = abortController.signal
    
        fetchOptions.body = JSON.stringify({searchString: inputValue})
      
        try {
    
          const response = await fetch(`${origin}api/search-products`, fetchOptions)
          
          const data = await response.json()
          
          setIsLoading(false)
          
          if(!data.length) {
            setNoMatch(true)
            setProductsFound([])
            return
          }
    
          setProductsFound(data)
          
        } catch (error) {
          setIsLoading(false)
          console.log("Ooops 🙃! error: ",error.message)
        }
      }

      function handleInputChange(event: any){
        setNoMatch(false)
        setInputValue(() => event.target.value)
      }

      function handleClearInput(){
        setInputValue("")
        setNoMatch(false)
      }

    const content =   <div className={`${styles.scrollBar} flex flex-col fixed top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 h-[60vh] w-11/12 bg-slate-800 rounded-lg py-4 drop-shadow-2xl transition-all md:w-5/12`}>
    {/* Heading  */}
    <div className='flex items-center gap-x-2 w-full h-10 bg-transparent mb-1 pb-4 px-4 border-b border-b-slate-600 text-slate-400'>
      <FiSearch  className='text-xl'/>
      <div className='relative w-full '>
        <input onChange={handleInputChange} value={inputValue} type="text" spellCheck="false" name="product" placeholder='Search Products' className={`${styles.searchProductInput} flex-1 bg-transparent outline-none pb-[1px] w-3/4 pr-2`} />
        {inputValue && <button ref={clearBtnRef} onClick={handleClearInput} className='clearBtn absolute right-4 top-0 py-1 px-4 rounded bg-white h-7 text-slate-900 font-extrabold flex items-center text-xs border-none hover:bg-slate-100 active:bg-slate-300 focus:outline-none'>clear</button>}    
      </div>
      <AiFillCloseCircle onClick={() => setPopOver(false)} className="text-xl cursor-pointer"/>
    </div>

    {/* status */}
    <div className='my-1 h-8 px-4 text-sm text-slate-400'>
    {isLoading && inputValue && <p>Searching...</p>}
    {
     noMatch && <p> No match found for &quot;{inputValue}&quot;</p>
    }
    </div>
  
    {/* content  */}
    <div className={`${styles.scrollBar} container overflow-y-auto px-4`}>
    {
     !!productsFound.length && productsFound.map((product) => (
        <div key={product.id} className='flex items-center w-full h-20 bg-slate-900 border border-slate-800 shadow-lg p-2 my-2 rounded-lg'>
          <Image 
            src={product.image} 
            alt={product.name} 
            width="10"  
            height="10"
            loading='lazy' 
            className='h-10 w-10 rounded mr-4' 
          />
          <div className='flex flex-col flex-1'>
            <p className='text-sm font-extrabold'><small className='text-slate-500 text-xs'>Name</small> {product.name}</p>
            <p className='text-sm font-extrabold'><small className='text-slate-500 text-xs'>Price</small> {parseFloat(product.price).toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
          </div>
          <div className='flex gap-x-4 text-xs'>
            <button className='bg-white font-extrabold text-slate-800 py-2 px-4 rounded border-none outline-none hover:bg-slate-100 active:bg-white focus:outline-none'>Details</button>
            {/* <button className='bg-green-300 text-slate-800 border-none p-y px-4 rounded hover:bg-green-400 active:bg-green-500 focus:outline-none'>
              <GrAdd />
            </button> */}
            <button className='bg-red-600 text-white p-y px-4 rounded border-none hover:bg-red-500 active:bg-red-700 focus:outline-none'>
              <FaTrash />
            </button>
          </div>
        </div>
      ))
    }
    </div>
  
  
  </div>

    return content
}

export default SearchBox