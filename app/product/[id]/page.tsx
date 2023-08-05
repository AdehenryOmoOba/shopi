import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import {HiOutlineArrowNarrowLeft} from "react-icons/hi"
import AddToCartButton from "@/app/components/addToCartButton/AddToCartButton";
import { findProduct } from "@/utils/findProduct";


let product: TProductDetails | null;

export async function generateMetadata({params}: {params: {id: string}}) {

  const product: TProductDetails = await findProduct(params.id)

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

export default async function SingleProduct({params}: {params: {id: string}}) {

  const product: TProductDetails = await findProduct(params.id)

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
      <p className="text-gray-600 mt-2 w-5/6 md:w-3/5 lg:w-2/5"><span className="font-bold text-gray-400">Description</span>: {product.description}</p>
      <p className="text-gray-600 mt-2"><span className="font-bold text-gray-400">Vendor</span>: {product?.vendor?.username}</p>
      <div className="flex my-4">
        <span className="text-yellow-500">⭐️</span>
        <span className="text-yellow-500">⭐️</span>
        <span className="text-yellow-500">⭐️</span>
        <span className="text-yellow-500">⭐️</span>
        <span className="text-gray-400">⭐️</span>
      </div>
      <div className="flex gap-x-4 items-center">
        <Link href="/">
          <button className="flex items-center justify-center gap-x-2 h-10 w-36 rounded-lg text-sm font-bold bg-slate-800 focus:outline-none focus:shadow-outline hover:text-white transition-colors">
            <HiOutlineArrowNarrowLeft />
            Go Back
          </button>
        </Link>
        <AddToCartButton data={product} />
      </div>
    </div>
  )
}


