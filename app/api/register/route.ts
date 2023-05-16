import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import {z} from "zod"

const newUserSchema = z.object({
  username: z.string({required_error: "Please provide username"}),
  password: z.string({required_error: "Please provide password"}),
  email: z.string({required_error: "Please provide email"}).email({message: "Please provide valid email"}),
  phone: z.string({required_error: "Please provide phone number"})
})

export async function POST(req: Request) {
  try {
    const userData = await req.json()
    console.log("from client ", userData)
    const validatedData = newUserSchema.parse(userData)
    const hashedPassword  = await bcrypt.hash(userData.password, 12)
    const newUser = await prisma.user.create({
      data: {name: validatedData.username, password: hashedPassword, email: validatedData.email, phone: validatedData.phone}
    })
    console.log("New created user ", newUser)
    return NextResponse.json(newUser)
  } catch (error: any) {
    console.log(error.message)
    return NextResponse.json({error: error.message}, {status: 401})
  }
}