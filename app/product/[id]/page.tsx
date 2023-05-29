import { Product } from "@prisma/client";
import fs from "fs"

export async function generateStaticParams() {
  const data: Promise<Product[]> = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))
  const products = await data

  const paramsArray = products.map((product) => ({
    id: product.id
  }))

  return paramsArray
}

const products: Product[] = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))

export default function SingleProduct({params}: {params: {id: string}}) {
  
  const product = products.find((product) => product.id === params.id)

  return (
    <div>
      {JSON.stringify(product)}
    </div>
  )
}