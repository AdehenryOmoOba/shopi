"use client"
import React, { useContext, useState } from 'react'
import { AppContext } from '../../utils/context/appContextProvider'
import {RiDeleteBinLine} from "react-icons/ri" 
import Image from 'next/image'
import { useNotification } from '../components/notification/Notification'
import { useRouter } from 'next/navigation'
import Button from '../components/Button'


export default function Cart() {

  const {user, addItemToCart, decrementCartCount, deleteCartItem, clearCart, cartTotal} = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(false)
  const notify = useNotification()
  const router = useRouter()


  
  const handleClearCart = () => {
    clearCart()
    notify({type: "success", message: `Cart is empty`}, 2000)
  }
  
  const handleRemoveItem = ({itemId, itemName}: {itemId: string, itemName: string}) => {
    deleteCartItem({itemId, itemName})
    notify({type: "success", message: `${itemName} is removed from cart`}, 2000)
  }

  const handleDecrementCartCount = ({itemId, itemName, itemCount}: {itemId: string, itemName: string, itemCount: number}) => {
    decrementCartCount({itemId, itemName})
    console.log("itemcount type", typeof itemCount)
    if(itemCount === 1) notify({type: "success", message: `${itemName} is removed from cart`}, 2000)
  }

  const handleCheckout = async (cart: {item: TProductDetails, count: number}[]) => {
    setIsLoading(true)
    try {
      const response = await fetch("http://localhost:3000/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(cart)
      })

      
      if(!response.ok) {
        notify({type: "error", "message": "Checkout is unsuccessful"})
        return
      }
      
      const {url} = await response.json()
      router.push(url)
      setIsLoading(false)
    } catch (error) {
      console.log(error.message)
    }
  }

  const countControlBtn = (cartItem: {item: TProductDetails, count: number}) => (<div className='flex mb-5'>
                            <button onClick={() => handleDecrementCartCount({itemId: cartItem.item.id, itemName: cartItem.item.name, itemCount: cartItem.count})} className='py-[4.5px] px-4 bg-slate-700 ml-2 mr-0 active:bg-slate-900 rounded-l-sm rouned'>-</button>
                            <span className='grid place-content-center w-9 border-4 border-slate-700 text-white'>{cartItem.count}</span>
                            <button onClick={() => addItemToCart(cartItem.item)} className='py-[4.5px] px-4 bg-slate-700 mr-2 ml-0 active:bg-slate-900 rounded-r-sm'>+</button>
                          </div>)

  const removeBtn = (cartItem: {item: TProductDetails, count: number}) => (<button onClick={() => handleRemoveItem({itemId: cartItem.item.id, itemName: cartItem.item.name})} className="flex items-center gap-x-1 text-slate-300 py-2 px-4 w-28 rounded font-extrabold border border-gray-800 hover:text-white hover:bg-slate-800 transition-colors">
                      <RiDeleteBinLine />
                      <span>Remove</span>
                    </button>)

  const checkoutBtnStyles = "relative bg-white text-gray-900 font-extrabold w-full h-12 text-lg rounded-md  transition ease-linear hover:-translate-y-1 hover:scale-[1.02] hover:text-black duration-200"

  return (
    <div className="flex flex-col  bg-gray-950 rounded-lg h-[82vh] px-10 border border-gray-900 gap-x-10 overflow-auto mx-auto md:w-[90vw] lg:w-[80vw] md:flex-row">

     {/* Left side */}
     <div className='h-max md:w-3/5'>
      <div className='flex items-center bg-black sticky top-0 justify-between pb-10 pt-16 h-24'>
       <h2 className='text-slate-300 text-3xl font-bold'>Cart</h2>
       <button onClick={handleClearCart} className="flex items-center gap-x-1 leading-none h-12 text-slate-300 py-2 px-4 w-max rounded font-extrabold border border-gray-800 hover:text-white hover:bg-slate-800 transition-colors">
        <RiDeleteBinLine />
        <span>Clear cart</span>
       </button>
      </div>
      <div className='flex bg-black sticky top-24 h-10 w-full font-extrabold text-gray-500'>
        <div className='flex w-[22rem]'>
          <h3 className='text-sm'>S/N</h3>
          <h3 className='text-sm ml-5'>PRODUCT</h3>
        </div>
        <h3 className='hidden md:flex md:text-sm md:flex-1 md:justify-center'>QUANTITY</h3>
        <h3 className='text-sm w-56 text-end'>PRICE</h3>
      </div>

      <div>
        {user?.cart?.map((cartItem, index) => (
          <div key={cartItem.item.id} className='flex w-full py-7 font-extrabold border-t-[0.1px] border-gray-900'>
          <div className="flex w-[22rem]">
            <h3 className='flex items-center text-gray-500'>{index + 1}</h3>
            <div className='flex flex-col'>
             <div className='grid h-24 w-24 place-items-center bg-gray-900 ml-5 mr-3 rounded-md mb-4'>
               <Image src={cartItem.item.image} alt="hoodie" height={80} width={80} />
             </div>
             <div className='flex md:hidden'>
               {countControlBtn(cartItem)}
               <RiDeleteBinLine onClick={() => handleRemoveItem({itemId: cartItem.item.id, itemName: cartItem.item.name})} style={{height: "70%", fontSize: "1.3rem", cursor: "pointer"}}/>
              </div>
            </div>
            <div className='flex flex-col'>
              <p className='mt-8 text-gray-100 font-extrabold md:bg-transparent md:mt-0'>{cartItem.item.name}</p>
              <p className='hidden text-gray-500 mb-2 md:block'>Category : {cartItem.item.category}</p>
            </div>
          </div>
          <div className="hidden flex-col items-center qty-control flex-1 text-center md:flex">
            {countControlBtn(cartItem)}
            {removeBtn(cartItem)}
          </div>
          <div className="w-56 text-end text-white">{parseFloat(cartItem.item.price).toLocaleString("en-US", {style: "currency", currency: "USD"})}</div>
          </div>
        ))}
      </div>

     </div>
     {/* Right side */}
     <div className='sticky top-10 border border-slate-800 h-max flex-1 rounded-lg p-5 mb-5 md:w-8'>
      <div className="flex justify-between mb-3">
        <p className='text-[1rem] font-extrabold font text-gray-500'>Subtotal</p>
        <span className='text-lg font-extrabold'>{parseFloat(`${cartTotal}`).toLocaleString("en-US", {style: "currency", currency: "USD"})}</span>
      </div>
       <div className="flex justify-between mb-3">
         <p className='text-[1rem] font-extrabold text-gray-500'>Coupon code</p>
         <input type="text" className='bg-gray-800 text-white border border-gray-700 px-4 h-10 text-[1rem] uppercase tracking-[0.1rem] w-36 text-right rounded '/>
       </div>
       <div className="flex justify-between mb-3">
         <p className='text-[1rem] font-extrabold text-gray-500'>Discount</p>
         <span className='text-lg font-extrabold'>$0.00</span>
       </div>
       <div className='pt-7 border-t-[0.1px] border-gray-900'>
        <div className="flex justify-between mb-3">
          <p className='text-[1rem] font-extrabold text-gray-200'>Grand total</p>
          <span className='text-lg font-extrabold'>{parseFloat(`${cartTotal}`).toLocaleString("en-US", {style: "currency", currency: "USD"})}</span>
        </div>
        {/* <button onClick={() => handleCheckout(user.cart)} className=''>Checkout now</button> */}
        {/* <button onClick={() => handleCheckout(user.cart)} className={checkoutBtnStyles} disabled={isLoading}>
                   <p className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isLoading ? "opacity-0" : "opacity-100" }`}>Checkout now</p>
                   <svg className={`absolute left-1/2 top-1/4 -translate-x-1/2 -rotate-[360] w-5 h-5 mr-3 -ml-1 text-black animate-spin ${isLoading ? "opacity-100" : "opacity-0" }`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                     <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                     <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                   </svg>
        </button> */}
        <Button action={handleCheckout} actionPayload={user?.cart} btnStyles={checkoutBtnStyles} isLoading={isLoading} svgColor="text-black" name="Checkout now" />
       </div>
     </div>
    </div>
  );
};