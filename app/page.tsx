import fs from 'fs'
import ProductsPage from "./components/productsPage/ProductsPage"
import SearchBar from "./components/searchBar/searchBar"
import { getProducts } from '@/utils/getProducts'


const path = 'products.json'

export default async function Home() {

  const products: TProductDetails[] = await getProducts()

  fs.writeFileSync(path, JSON.stringify(products, null, 2))

  const categories = [...new Set(products.map((product) => product.category))]
  const categoriesLength = categories.length

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