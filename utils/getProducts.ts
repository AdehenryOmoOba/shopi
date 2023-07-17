import origin from "./origin"


export async function getProducts(): Promise<TProductDetails[]> {
    
    try {
      const response = await fetch(`${origin}api/products`, {
        cache: "no-store"
      })
      if(!response.ok) throw new Error("Something went wrong")
      const data: TProductDetails[] = await response.json()
      return data

    } catch (error) {
      console.log(error.message)
      return null
    }
}
