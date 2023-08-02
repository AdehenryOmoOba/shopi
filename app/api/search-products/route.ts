import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'

function sleep(time: number) {
  return new Promise((resolve) => setTimeout(resolve, time))
}

const products = [
  {
  id: 'bac54073-ad71-4a09-841f-23f6d07bc49c',
  name: 'Jabr3',
  price: '285',
  image: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-f8b0d.appspot.com/o/images%2Fjabr.png?alt=media&token=bf023f9f-89e9-4212-a24f-4297145e4b21'
},
{
  id: '82120bc4-9127-4418-9e25-c3d93431be82',
  name: 'Fan Hoodie',
  price: '105.45',
  image: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-f8b0d.appspot.com/o/images%2Fhoodie1.png?alt=media&token=26c5aacb-1a8c-4dea-beb3-2cb1b7edc2cf'
},
{
  id: '2471c8e3-1f91-4bee-aafe-ed5acef6cc28',
  name: 'Sideren Hoodie',
  price: '98.35',
  image: 'https://firebasestorage.googleapis.com/v0/b/ecommerce-f8b0d.appspot.com/o/images%2Fhoodie2.png?alt=media&token=2eb7ddb1-91ce-4ac3-9ff0-f9d6e7922d2a'
}
]

export async function POST(req: Request) {

  const searchString = await req.json()

  try {

    // await sleep(3000)



    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: searchString.searchString,
          mode: "insensitive"
        }
      },
      select: {
        id: true,
        name: true,
        price: true,
        image: true
      }
    })

    console.log(products)

    return NextResponse.json(products, {
      status: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      }
    })

  } catch (error: any) {
    return NextResponse.json({error: error.message}, {status: 403})
  }
}