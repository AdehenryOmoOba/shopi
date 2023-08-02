"use client"
import { AppContext } from "@/utils/context/appContextProvider";
import { usePathname, useRouter } from "next/navigation";
import {useContext, useState} from "react"
import { useNotification } from "../notification/Notification";
import {GiShoppingCart} from 'react-icons/gi'
import {RiDeleteBinLine} from "react-icons/ri" 
import SearchPopOver from "../searchPopOver/SearchPopOver";


export default function AddToCartButton({data} : {data: TProductDetails}) {
  const notify = useNotification()  
  const {addItemToCart, user, deleteCartItem} = useContext(AppContext);
  const path = usePathname()
  const [popOver, setPopOver] = useState(false)
  const router = useRouter()

  const handleAddItem = (data: TProductDetails) => {
    if(!user) {
      setPopOver(true)
      return
    }
    
    addItemToCart(data)
    notify({type: "success", message: `${data.name} added to cart`}, 2000)
  }

  const handleRemoveItem = ({itemId, itemName}: {itemId: string, itemName: string}) => {
    deleteCartItem(itemId)
    notify({type: "success", message: `${itemName} is removed from cart`}, 2000)
  }

  function isInCart () {
    const productId = path.split("/product/")[1]
    return user?.cart.some(({item}) => item.id === productId) ?? false
  }

  function goToLoginPage(){
    router.push("/login")
  }

  console.log("rendering...")

  const addToCart = <button onClick={() => handleAddItem(data)} className="flex items-center justify-center gap-x-1 bg-blue-600 h-10 text-white font-bold rounded focus:outline-none focus:shadow-outline w-max px-5">
                     <GiShoppingCart className="text-sm"/>
                     <p className="">Add to Cart</p>
                    </button>

  const removeFromCart = <button onClick={() => handleRemoveItem({itemId: data.id, itemName: data.name})} className="flex items-center justify-center gap-x-1 bg-red-600 text-white font-bold h-10 rounded focus:outline-none focus:shadow-outline w-max px-5">
                          <RiDeleteBinLine className="text-sm"/>
                          <p>Delete from Cart</p>
                         </button>

  
  if(isInCart()){
    return removeFromCart
  }else{
    return (
            <>
             {addToCart}
             {popOver && <SearchPopOver popOver={popOver} setPopOver={setPopOver}>
               <div className="flex flex-col fixed gap-y-4 py-10 items-center justify-center top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/4 h-48 w-10/12 bg-slate-900 rounded-lg drop-shadow-2xl transition-all md:w-5/12">
                <p className="text-4xl">🤗</p>
                <p>Please login before adding item to cart</p>
                <div className="flex gap-x-4 text-xs font-extrabold mb-4 mt-2">
                  <button onClick={() => setPopOver(false)} className="bg-transparent text-white border border-white px-4 py-2 rounded-md">Cancel</button>
                  <button onClick={goToLoginPage} className="bg-white border border-white text-slate-900 px-4 py-2 rounded-md">Login</button>
                </div>
               </div>
             </SearchPopOver>
             }
            </>
      )
  }

}
    