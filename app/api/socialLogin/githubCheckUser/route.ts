import { NextRequest, NextResponse } from 'next/server'
import { getServerSession } from 'next-auth/next'
import { prisma } from '@/prisma/prismaClient'
import { nextAuthOptions } from '../../auth/[...nextauth]/route'


// Persist current social user
 export async function GET(req: NextRequest, res: NextResponse) {

     try {
        const userInfo = await getServerSession(nextAuthOptions)

        let user = null
        if(userInfo?.user?.email){
        // make prisma call to get user
        user = await prisma.user.findUnique({where: {email: userInfo?.user?.email}})
      }

      if(!user) throw new Error("No user logged in")

      return NextResponse.json(user)
      
    } catch (error) {
      return NextResponse.json({error: `Something went wrong. ${error.message}`}, {
       status: 404,
      })
    }
}
