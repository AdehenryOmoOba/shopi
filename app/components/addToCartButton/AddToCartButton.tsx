"use client"
import { useNotification } from "@/app/components/notification/Notification";
import { AppContext } from "@/utils/context/appContextProvider";
import { debouncedCartSync } from "@/utils/debouncedCartSync";
import {useContext} from "react"


export default function AddToCartButton({data} : {data: TProductDetails}) {
    
    const {user, setUser, setCartCount, updateCartCount} = useContext(AppContext);
    
    const notify = useNotification()
    
    const addItemToCart = () => {
        
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
      notify({type: "success", message: `${data.name} added to cart`}, 2000)
      
      debouncedCartSync({id: user.id, cart: user.cart})
    }

    return (
        <button onClick={addItemToCart} className="bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline">
        Add to Cart
      </button>
    )
    
}
    
