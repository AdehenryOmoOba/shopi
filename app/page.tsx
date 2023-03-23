import fs from 'fs'
import ProductsPage from "./components/productsPage/ProductsPage"
import SearchBar from "./components/searchBar/searchBar"
import mockData from '../ecommerce_products.json' 


const path = 'products.json'

export default async function Home() {
 
  // const response = await fetch('http://localhost:3000/api/products', {
  //   next: {
  //     revalidate: 3600
  //   }
  // })
  // const products: TProduct[] = await response.json()

  const products: TProduct[] = mockData
  const idArray = products.map((product) => ({id: product.id}))
  fs.writeFileSync(path, JSON.stringify(idArray, null, 2))

  const categories = [...new Set(products.map((product) => product.category))]
  const categoriesLength = categories.length

  return (
    <section className="p-5">
      <SearchBar />
      <div className='py-5'>
        {categories.map((category, index) => (
        <div key={category} className=''>
          <ProductsPage products={products} category={category} index={index} categoriesLength={categoriesLength} />
        </div>
        ))}
     </div>
    </section>
  )
}