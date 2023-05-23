import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
      const productDetails = await prisma.product.findMany({
      include: {
        vendor: true
      }
    })
    return NextResponse.json(productDetails)
  } catch (error: any) {
    return NextResponse.json({message: error.message})
  }
}