import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {
    try {
      const products = await prisma.product.findMany({})
    return NextResponse.json(products)
  } catch (error: any) {
    return NextResponse.json({message: error.message})
  }
}