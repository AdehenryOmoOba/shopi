"use client"
import React from 'react'
import ProductCard from '../productCard/ProductCard'


type ProductsPageProps = {
    products: TProductDetails[]
    category: string
}

export default function ProductsPage({products, category}: ProductsPageProps) {
  
  return (
    <div className='mt-6'>
     <p className="font-extrabold py-1 px-2 text-xs rounded ml-4 capitalize text-slate-900 bg-white inline-block tracking-wider">{category}</p>
     <div className="flex justify-start space-x-10 overflow-x-scroll snap-x" id="items_container">
      {products.map((item) => (
        <ProductCard key={item.id}  data={item} />
      ))}
     </div>
    </div>
  )
}