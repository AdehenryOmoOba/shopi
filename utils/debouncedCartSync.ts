import axios from "axios";

export let timeoutID: NodeJS.Timeout;

export function debouncedCartSync(data: TCart) {
 
  clearTimeout(timeoutID)

  timeoutID = setTimeout(async () => {

    console.log("Synching cart with Database...")

    const response = await axios.put("http://localhost:3000/api/edit-cart", data)
    
    if(response.status !== 200) return console.log("Error adding item to cart")

    console.log("Item added successfully")

  }, 5000);

}