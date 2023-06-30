"use client"
import { AppContext } from "@/utils/context/appContextProvider";
import {useContext} from "react"
import { useNotification } from "../notification/Notification";



export default function AddToCartButton({data} : {data: TProductDetails}) {

  const notify = useNotification()  
  const {addItemToCart,user} = useContext(AppContext);

  const handleAddItem = (data: TProductDetails) => {
    if(!user) {
      alert("Please login before adding items to cart.")
      return
    }
    
    addItemToCart(data)
    notify({type: "success", message: `${data.name} added to cart`}, 2000)
  }
    
  return (
      <button onClick={() => handleAddItem(data)} className="bg-blue-600 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Add to Cart
    </button>
  )
}
    