import origin from "./origin"


export async function findProduct(id: string): Promise<TProductDetails> {
    
    try {
      
      const response = await fetch(`${origin}api/find-product?id=${id}`, {
        next: {
          revalidate: 60 * 60
        }
      })
      if(!response.ok) throw new Error("Something went wrong")
      const data: TProductDetails = await response.json()
      return data

    } catch (error) {
      console.log(error.message)
      return null
    }
}