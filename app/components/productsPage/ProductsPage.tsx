"use client"
import { AppContext } from '@/utils/context/appContextProvider'
import React,{useContext} from 'react'
import ProductCard from '../productCard/ProductCard'

type ProductsPageProps = {
    products: TProductDetails[]
    category: string
    index: number
    categoriesLength: number
}

export default function ProductsPage({products, category, index , categoriesLength}: ProductsPageProps) {
  
  const { searchString } =  useContext(AppContext)!

  let filteredProducts: TProductDetails[] = []

  if(searchString) {
   filteredProducts = products.filter((items) => items.name.toLowerCase().includes(searchString.toLowerCase()))
  }

  let productsArray = filteredProducts.length ? filteredProducts : !filteredProducts.length && searchString ? [] : products
  let isCategory = productsArray.find((product) => product.category === category)

  return (
    <div className='mt-6'>
     {isCategory && <h2 className="font-extrabold py-2 px-4 rounded-lg ml-4 capitalize text-slate-900 bg-white inline-block tracking-wider">{category}</h2>}
     <div className="flex justify-start space-x-10 overflow-x-scroll snap-x" id="items_container">
      {productsArray.filter((items) => items.category === category).map((item) => (
        <ProductCard key={item.id}  data={item} />
      ))}
     </div>
     {productsArray.length === 0 && index === categoriesLength - 1 && <div><p className='text-center'>No match for &quot;{searchString}&quot;</p></div>}
    </div>
  )
}