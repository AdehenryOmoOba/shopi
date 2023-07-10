import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prismaClient'


// Login user
export async function POST(req: NextRequest, res: NextResponse) {

  const userInfo: {name: string, email: string} = await req.json()

  console.log("from API:", {name: userInfo.name, email: userInfo.email})

    try {
      // make prisma call to get user
      let user = await prisma.user.findUnique({where: {email : userInfo.email}})

      // If user does not exist create it
      if(!user) {
        let newUser = await prisma.user.create({
          data: {
            email: userInfo.email,
            username: userInfo.email.split("@")[0],
            phone: "",
            socialmediaUser: true
          }
        })
        return NextResponse.json(newUser)
      }else{
        return NextResponse.json(user)
      }
      
    } catch (error) {
      return NextResponse.json({error: `Something went wrong. ${error.message}`}, {
      status: 500,
      })
    }
}
