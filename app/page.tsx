import fs from 'fs/promises'
import ProductsPage from "./components/productsPage/ProductsPage"
import SearchBar from "./components/searchBar/searchBar"
import { getProducts } from '@/utils/getProducts'
import { getServerSession } from 'next-auth'


const path = "../products.json"

export default async function Home() {

  let products: TProductDetails[] | object = await getProducts()

  let categories : string[] | null = null

  
  if(Array.isArray(products)) {
    await fs.writeFile(path, JSON.stringify(products, null, 2))
    categories = [...new Set(products.map((product: TProductDetails) => product.category))]
  }else{
    products = null
  }

  const categoriesLength = categories?.length

  const githubSession = await getServerSession()

  return (
    <section>
      <SearchBar />
      <div>
        {!products ? <p className='text-center'>Error fetching products from database 🤨</p> : categories.map((category, index) => (
        <div key={category}>
          <ProductsPage products={products as TProductDetails[]} category={category} index={index} categoriesLength={categoriesLength} />
        </div>
        ))}
     </div>
    </section>
  )
}