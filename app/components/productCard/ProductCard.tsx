import Link from 'next/link'
import {CldImage} from 'next-cloudinary'
import AddToCartButton from '../addToCartButton/AddToCartButton'


export default function ProductCard({data}: {data: TProductDetails}) {

  return (
    <div className="p-4 snap-start">
      <div className="w-64">
        <Link key={data.id} href={`/product/${data.id}`}>
        <div className="p-5 bg-gray-900 rounded-lg h-64 w-64 object-contain">
          <CldImage 
           deliveryType='fetch'
           src={data.image} 
           alt={data.name} 
           width="256"  
           height="256"
           loading='lazy' 
          />
        </div>
        <div className="mt-2">
          <h3 className="font-bold text-lg">{data.name}</h3>
        </div>
        <p className="mt-1 text-sm leading-5 line-clamp-4 text-blue-100">{data.description}</p>
        </Link>
        <div className="flex mt-2 items-center">
          <p className="text-2xl font-bold grow">{parseFloat(data.price).toLocaleString("en-US", {style: "currency", currency: "USD"})}</p>
          <AddToCartButton data={data} />
        </div>
      </div>
    </div>
  )
}