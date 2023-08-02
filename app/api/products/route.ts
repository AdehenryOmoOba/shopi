import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {

    try {
      const allProducts = await prisma.product.findMany({
        include: {
          vendor: {
            select: {
              username: true,
              email: true,
              phone: true,
            }
          }
        }
      })
      return NextResponse.json(allProducts)
  } catch (error: any) {
    return NextResponse.json({message: error.message})
  }
}