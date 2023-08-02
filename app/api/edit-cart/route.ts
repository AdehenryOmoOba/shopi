import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'

type TCart = {
  id: string
  cart: {item: TProduct, count: string}[]
}


export async function PUT(req: Request) {

  const {id, cart} = await req.json() as TCart

  try {

    const user = await prisma.user.update({
      where: {
        id: id
      },
      data: {
        cart: cart
      }
    })

    return NextResponse.json({user})
  } catch (error: any) {
  
    return NextResponse.json({error: "error modifying cart"}, {status: 403})
  }
}