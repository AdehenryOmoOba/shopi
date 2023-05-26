import { prisma } from '@/prisma/prismaClient'
import { NextRequest, NextResponse } from 'next/server'


export async function POST(req: NextRequest) {

    const user = await req.json()

    console.log("user from client: ",user)
    
    try {
      const deletedUser = await prisma.user.delete({
        where: {
            username: user.username
        }
      })
      console.log({deletedUser})
      return  NextResponse.json({message: `user "${user.username}" deleted successfully`})
    } catch (error) {
    return  NextResponse.json({error: `Error deleting user "${user.username}"`}, {status: 401})
    }
  }