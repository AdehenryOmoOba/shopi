import { prisma } from '@/prisma/prismaClient'
import { NextResponse } from 'next/server'
import bcrypt from "bcrypt"
import {z} from "zod"

const newUserSchema = z.object({
  username: z.string().nonempty({message: "Please provide username."}).min(3, "Username must be at least three characters long."),
  password: z.string().nonempty("Please provide password.").min(3, "Password must be at least three characters long."),
  email: z.string().nonempty("Please provide email.").email({message: "Please provide valid email."}),
  phone: z.string().nonempty("Please provide phone number.")
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

    let errorResonse: string;

    if (error.code) {
     // Handles databse schema level errors
     errorResonse = `${error?.meta?.target[0]} "${userData[error?.meta?.target[0]]}" already exist.`
    } else{
      // Handles zod schema validation errors
      errorResonse = error?.issues[0]?.message
    }    

    return NextResponse.json({error: errorResonse}, {status: 403})
  }
}