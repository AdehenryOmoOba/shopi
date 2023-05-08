import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"

export async function POST(req: Request) {
  try {
    const userData = await req.json()
    console.log("from client ", userData)
    const hashedPassword  = await bcrypt.hash(userData.password, 12)
    const newUser = await prisma.user.create({
      data: {name: userData.username, password: hashedPassword, email: userData.email, phone: userData.phone}
    })
    console.log("New created user ", newUser)
    return NextResponse.json(newUser)
  } catch (error: any) {
    return NextResponse.json({message: error.message})
  }
}