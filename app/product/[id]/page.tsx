import fs from "fs"
import { Product } from "@prisma/client";
import { notFound } from "next/navigation";


const products: Product[] = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))

export default function SingleProduct({params}: {params: {id: string}}) {
  
  const product = products.find((product) => product.id === params.id)

  if (!product) return notFound()

  return (
    <div>
      {JSON.stringify(product)}
    </div>
  )
}


export async function generateMetadata({params}: {params: {id: string}}) {
  const data: Promise<Product[]> = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))
  
  const products = await data
  const product: Product | undefined = products.find((product) => product.id === params.id)

  if(!product){
    return {
      title: "Page does not exist",
      description: "The page you requested does not exist on this domain"
    }
  }

  return {
    title: product?.name,
    description: product?.description
  }

}

// This functions runs first in build time
export async function generateStaticParams() {
  const data: Promise<Product[]> = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))
  const products = await data
  const paramsArray = products.map((product) => ({
    id: product.id
  }))
  return paramsArray
}