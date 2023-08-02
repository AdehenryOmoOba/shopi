import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import {z} from "zod"

const newProductSchema = z.object({
  name: z.string().nonempty("Please provide product name"),
  category: z.string().nonempty({message: "Please provide product category"}),
  description: z.string().nonempty("Please provide product description"),
  price: z.string({required_error: "Please provide product price"}),
  image: z.string().nonempty("Please upload product image"),
  vendorid: z.string()
})

export async function POST(req: Request) {

  const productData = await req.json()

  try {
    const {category, description, image, name, price, vendorid} = newProductSchema.parse(productData)
    
    const newProduct = await prisma.product.create({
      data: { category, description, image, name, price, vendorid }
    })
    return NextResponse.json(newProduct)
  } catch (error: any) {

    let errorResonse: string;

    if (error.code) {
     // Handles databse schema level errors
     errorResonse = "Error adding new product"
    } else{
      // Handles zod schema validation errors
      errorResonse = error?.issues[0]?.message
    }   
    return NextResponse.json({error: errorResonse}, {status: 403})
  }
}