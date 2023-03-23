import productIds from '../../../products.json'
import mockData from '../../../mockData.json'


export async function generateStaticParams() {

  return productIds.map((product) => {
    return {
      id: product.id,
    }
  })
}

export async function generateMetadata({params}: {params: {id: string}}): Promise<{title: string, description: string}>{

  //   const response = await fetch('http://localhost:3000/api/product-details', {
  //   next: {
  //     revalidate: 3600
  //   }
  // })

  // const allProducts: TProductDetails[] = await response.json()

  const allProducts: any[] = mockData

  const product = allProducts.find((product) => product.id === params.id)!

  return {
    title: product.name,
    description: `${product.description.slice(0, 100)}...`,
  }
}

async function getDetails(id: string) {
//  const response = await fetch('http://localhost:3000/api/product-details', {
//    next: {
//      revalidate: 3600
//    }
//  })
// const products: TProductDetails[] = await response.json()
// return products.find((product) => product.id === id)

 const allProducts: any[] = mockData
 const product = allProducts.find((product) => product.id === id)
 return product
}

export default async function SingleProduct({params}: {params: {id: string}}) {
  
  const product = await getDetails(params.id)

  return (
    <div>
      {JSON.stringify(product)}
    </div>
  )
}
