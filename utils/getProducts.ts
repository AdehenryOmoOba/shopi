import origin from "./origin"

// async function sleep(time: number) {
//   return new Promise((resolve) => setTimeout(resolve, time))
// } 

export async function getProducts(): Promise<TProductDetails[]> {

    // await sleep(5000)
    
    try {
      const response = await fetch(`${origin}api/products`, {
        next: {
          revalidate: 0
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