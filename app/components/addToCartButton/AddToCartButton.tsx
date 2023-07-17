"use client"
import { AppContext } from "@/utils/context/appContextProvider";
import { usePathname } from "next/navigation";
import {useContext} from "react"
import { useNotification } from "../notification/Notification";
import {GiShoppingCart} from 'react-icons/gi'
import {RiDeleteBinLine} from "react-icons/ri" 


export default function AddToCartButton({data} : {data: TProductDetails}) {

  const notify = useNotification()  
  const {addItemToCart,user, deleteCartItem} = useContext(AppContext);
  const path = usePathname()

  const handleAddItem = (data: TProductDetails) => {
    if(!user) {
      alert("Please login before adding items to cart.")
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

  console.log(isInCart())

  const addToCart = <button onClick={() => handleAddItem(data)} className="flex items-center gap-x-1 bg-blue-600 h-10 text-white font-bold px-4 rounded focus:outline-none focus:shadow-outline w-max">
                     <GiShoppingCart />
                     <p>Add to Cart</p>
                    </button>

  const removeFromCart = <button onClick={() => handleRemoveItem({itemId: data.id, itemName: data.name})} className="flex items-center gap-x-1 bg-red-600 text-white font-bold h-14 px-4 rounded focus:outline-none focus:shadow-outline">
                          <RiDeleteBinLine />
                          <p>Delete from Cart</p>
                         </button>

  
  if(isInCart()){
    return removeFromCart
  }else{
    return addToCart
  }

}
    