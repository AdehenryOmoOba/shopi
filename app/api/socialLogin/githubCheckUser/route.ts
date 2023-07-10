import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/prisma/prismaClient'
import { getToken } from 'next-auth/jwt'


// Persist current social user
 export async function GET(req: NextRequest, res: NextResponse) {

  const secret = "KWEVPOM3M3F33F33PMFP"

  const token = await getToken({req, secret})

  console.log("jwt token: ", {token})

     try {
        let user = null

        if(token?.email){
        // make prisma call to get user
        user = await prisma.user.findUnique({where: {email: token?.email}})
      }

      if(!user) throw new Error("No user logged in")

      return NextResponse.json(user)
      
    } catch (error) {
      return NextResponse.json({error: `Something went wrong. ${error.message}`}, {
       status: 404,
      })
    }
}
