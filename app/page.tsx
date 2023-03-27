import fs from 'fs'
import ProductsPage from "./components/productsPage/ProductsPage"
import SearchBar from "./components/searchBar/searchBar"
import mockData from '../ecommerce_products.json'
import {getServerSession} from 'next-auth'
import { authOptions } from './api/auth/[...nextauth]/route'


const path = 'products.json'

export default async function Home() {

  const sessionData = await getServerSession(authOptions)
 
  const products: TProduct[] = mockData

  const idArray = products.map((product) => ({id: product.id}))
  fs.writeFileSync(path, JSON.stringify(idArray, null, 2))

  const categories = [...new Set(products.map((product) => product.category))]
  const categoriesLength = categories.length

  console.log("from home page ", sessionData)

  return (
    <section>
      <SearchBar />
      <div>
        {categories.map((category, index) => (
        <div key={category}>
          <ProductsPage products={products} category={category} index={index} categoriesLength={categoriesLength} />
        </div>
        ))}
     </div>
    </section>
  )
}