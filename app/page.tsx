import fs from 'fs'
import ProductsPage from "./components/productsPage/ProductsPage"
import SearchBar from "./components/searchBar/searchBar"
import { getProducts } from '@/utils/getProducts'


const path = "products.json"

export default async function Home() {

  let products = await getProducts() as TProductDetails[] | object
  let categories : string[] = []

  
  if(Array.isArray(products)) {
    console.log({products})
    fs.writeFileSync(path, JSON.stringify(products, null, 2))
    categories = [...new Set(products.map((product: TProductDetails) => product.category))]
  }else{
    products = null
  }

  const categoriesLength = categories?.length

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