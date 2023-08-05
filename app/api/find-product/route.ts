import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'

export async function GET(req: Request) {

    const id = new URL(req.url).searchParams.get("id")

    try {
      const product = await prisma.product.findUnique({
        where: {
          id
      }})
      return NextResponse.json(product)
  } catch (error: any) {
    return NextResponse.json({message: error.message})
  }
}