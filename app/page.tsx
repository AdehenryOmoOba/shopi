import ProductsPage from "./components/productsPage/ProductsPage"
import { getProducts } from '@/utils/getProducts'


export default async function Home() {

  let products = await getProducts() as TProductDetails[] | object
  let categories : string[] = []
  let productMap = new Map<string, TProductDetails[]>()

  
  if(Array.isArray(products)) {
    products.forEach((product: TProductDetails) => {
     if(productMap.has(product.category)){
       productMap.get(product.category).push(product)
     }else{
      productMap.set(product.category, [product])
     }
    })
    categories = Array.from(productMap.keys())
  }else{
    products = null
  }

  return (
    <section>
      <div className='mt-16'>
        {!products ? <p className='text-center'>Error fetching products from database 🤨</p> : categories.map((category, index) => (
        <div key={category}>
          <ProductsPage products={productMap.get(category) as TProductDetails[]} category={category} />
        </div>
        ))}
     </div>
    </section>
  )
}