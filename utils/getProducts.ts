export async function getProducts(): Promise<TProductDetails[]> {
    
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        next: {
          revalidate: 100
        }
      })
      if(!response.ok) throw new Error("Something went wrong")
      const data: TProductDetails[] = await response.json()
      return data

    } catch (error) {
      console.log(error.message)
      return null
    }
}