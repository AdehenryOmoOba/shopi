import fs from 'fs/promises'
import ProductsPage from "./components/productsPage/ProductsPage"
import SearchBar from "./components/searchBar/searchBar"
import { getProducts } from '@/utils/getProducts'


const path = 'products.json'

export default async function Home() {

  let products: TProductDetails[] | null = await getProducts()

  if(products) await fs.writeFile(path, JSON.stringify(products, null, 2))

  let categories : string[] | null = null

  if(products) categories = [...new Set(products.map((product) => product.category))]

  const categoriesLength = categories.length

  return (
    <section>
      <SearchBar />
      <div>
        {!products ? <p>Error fetching products from database 🤨</p> : categories.map((category, index) => (
        <div key={category}>
          <ProductsPage products={products} category={category} index={index} categoriesLength={categoriesLength} />
        </div>
        ))}
     </div>
    </section>
  )
}