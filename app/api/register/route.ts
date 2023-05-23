import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import {z} from "zod"

const newUserSchema = z.object({
  // username: z.string().nonempty("Please provide username").min(3, "Username must be at least three characters long"),
  username: z.string().min(3, "Username must be at least three characters long").nonempty({message: "Please provide username"}),
  password: z.string().nonempty("Please provide password").min(3, "Password must be at least three characters long"),
  email: z.string().nonempty("Please provide email").email({message: "Please provide valid email"}),
  phone: z.string().nonempty("Please provide phone number")
})

export async function POST(req: Request) {

  const userData = await req.json()

  try {
    const validatedData = newUserSchema.parse(userData)
    const hashedPassword  = await bcrypt.hash(validatedData.password, 12)
    const newUser = await prisma.user.create({
      data: {...userData, password: hashedPassword}
    })
    newUser.password = ""
    return NextResponse.json(newUser)
  } catch (error: any) {
    let zodError = error.issues[0].message === "Required" ? `${error.issues[0].path[0]} is required` : error.issues[0].message;
    let errorMsg = error.code ? `${error.meta.target[0]} "${userData[error.meta.target[0]]}" already exist` : zodError
    return NextResponse.json({error: errorMsg}, {status: 403})
  }
}