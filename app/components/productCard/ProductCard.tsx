
import React,{useContext} from 'react'
import Link from 'next/link'
import {CldImage} from 'next-cloudinary'
import { AppContext } from '@/utils/context/appContextProvider'
import { debouncedCartSync } from '@/utils/debouncedCartSync'


export default function ProductCard({data}: {data: TProduct}) {

  const {user, setUser, setCartCount} = useContext(AppContext);

  const updateCartCount = () => {
    let count = 0;
    for (let item of user.cart) {
      count += item.count
    }
    return count
  };

  const addToCart = () => {

    let duplicateIndex: number;

    if(!user) {
      alert("Please login before adding items to cart.")
      return
    }

    let isDuplicate = user.cart.some((item, index) => {
      if (item.item.id === data.id) {
        duplicateIndex = index
      }
      return item.item.id === data.id
    })

    if (isDuplicate) {
      user.cart[duplicateIndex].count++
      setUser({...user})
    }else{
      user.cart.push({item: data, count: 1})
      setUser({...user})
    }

    setCartCount(updateCartCount())
    
    // TODO: Complete implementation
    debouncedCartSync()
  }

  return (
    <div className="p-4 snap-start">
      <div className="w-64">
        <Link key={data.id} href={`/product/${data.id}`}>
        <div className="p-5 bg-gray-900 rounded-lg h-64 w-64 object-contain">
          <CldImage 
           deliveryType='fetch'
           src={data.image} 
           alt={data.name} 
           width="256"  
           height="256"
           loading='lazy' 
          />
        </div>
        <div className="mt-2">
          <h3 className="font-bold text-lg">{data.name}</h3>
        </div>
        <p className="mt-1 text-sm leading-5 line-clamp-4 text-blue-100">{data.description}</p>
        </Link>
        <div className="flex mt-2">
          <p className="text-2xl font-bold grow">{parseFloat(data.price).toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
          <button onClick={addToCart} className="bg-blue-600 text-white py-1 px-3 rounded">Add to Cart</button>
        </div>
      </div>
    </div>
  )
}