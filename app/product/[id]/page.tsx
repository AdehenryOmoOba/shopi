import fs from "fs"
import { notFound } from "next/navigation";
import Image from "next/image";

export async function generateMetadata({params}: {params: {id: string}}) {

  const products: TProductDetails[] = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))
  
  const product: TProductDetails | undefined = products.find((product) => product.id === params.id)

  if(!product){
    return {
      title: "Page does not exist",
      description: "The page you requested does not exist on this domain"
    }
  }

  return {
    title: product.name,
    description: product.description
  }

}

// This functions runs first in build time
export async function generateStaticParams() {
  const products: TProductDetails[] = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))
  const paramsArray = products.map((product) => ({
    id: product.id
  }))
  return paramsArray
}


const products: TProductDetails[] = JSON.parse(fs.readFileSync("products.json", {encoding: "utf-8"}))

export default function SingleProduct({params}: {params: {id: string}}) {
  
  const product = products.find((product) => product.id === params.id)
  
  if (!product) return notFound()

  return (

    <div className="flex flex-col items-center py-20">
    <Image 
     src={product.image} 
     alt={product.name} 
     width="256"  
     height="256"
     loading='lazy' 
    />
<h2 className="text-2xl font-bold mt-4">{product.name}</h2>
<p className="text-gray-600 mt-2"><span className="font-bold text-gray-400">Price</span>: {parseFloat(product.price).toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
<p className="text-gray-600 mt-2 w-1/4"><span className="font-bold text-gray-400">Description</span>: {product.description}</p>
<p className="text-gray-600 mt-2"><span className="font-bold text-gray-400">Vendor</span>: {product.vendor.username}</p>
<div className="flex mt-2">
  <span className="text-yellow-500">⭐️</span>
  <span className="text-yellow-500">⭐️</span>
  <span className="text-yellow-500">⭐️</span>
  <span className="text-yellow-500">⭐️</span>
  <span className="text-gray-400">⭐️</span>
</div>
<button
  // onClick={handleAddToCart}
  className="bg-blue-600 text-white font-bold py-2 px-4 mt-4 rounded focus:outline-none focus:shadow-outline"
>
  Add to Cart
</button>
</div>
  )
}


