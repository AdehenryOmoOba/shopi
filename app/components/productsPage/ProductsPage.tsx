"use client"
import { AppContext } from '@/utils/context/appContextProvider'
import React,{useContext} from 'react'
import ProductCard from '../productCard/ProductCard'

type Props = {
    products: TProduct[]
    category: string
    index: number
    categoriesLength: number
}

export default function ProductsPage({products, category, index , categoriesLength}: Props) {
  
  const {searchString} =  useContext(AppContext)!

  let filteredProducts: TProduct[] = []

  if(searchString) {
   filteredProducts = products.filter((items) => items.name.toLowerCase().includes(searchString.toLowerCase()))
  }

  let productsArray = filteredProducts.length ? filteredProducts : !filteredProducts.length && searchString ? [] : products
  let isCategory = productsArray.find((product) => product.category === category)

  return (
    <div className=''>
     {isCategory && <h2 className="text-2xl px-4 capitalize">{category}</h2>}
     <div className="flex justify-start space-x-10 overflow-x-scroll snap-x" id="items_container">
      {productsArray.filter((items) => items.category === category).map((item) => (
        <ProductCard key={item.id}  data={item} />
      ))}
     </div>
     {productsArray.length === 0 && index === categoriesLength - 1 && <div><p className='text-center'>No match for &quot;{searchString}&quot;</p></div>}
    </div>
  )
}