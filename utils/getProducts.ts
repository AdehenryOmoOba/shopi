import { Product } from "@prisma/client";

export async function getProducts(): Promise<Product[]> {
    
    try {
      const response = await fetch("http://localhost:3000/api/products", {
        next: {revalidate: 3600}
      })
      if(!response.ok) throw new Error("Something went wrong")
      const data: Product[] = await response.json()
      return data
    } catch (error) {
      console.log(error.message)
    }
}