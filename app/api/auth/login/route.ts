import { NextRequest, NextResponse } from 'next/server'
import {SignJWT, jwtVerify} from "jose"
import { nanoid } from 'nanoid'
import cookie from 'cookie'
import { prisma } from '@/prisma/prismaClient'
import bcrypt from "bcrypt"


const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
export const cookieOptions = {httpOnly: true, path: '/', secure: process.env.NODE_ENV === "production", maxAge: 3600}

// Persist current user
export async function GET(req: NextRequest) {
  const userToken = req.cookies.get("user-token")?.value

  try {
    if(!userToken) throw new Error("user not logged in")
    const verifiedToken = await jwtVerify(userToken, jwtSecret)
    const username = verifiedToken.payload.username as string
    let DBuser = await prisma.user.findUnique({
      where: {
        username
      }
    }) as unknown as DBuser || null

    return new Response(JSON.stringify(DBuser))
  } catch (error) {

    return new Response(JSON.stringify({error: error.message}))
  }
}

// Login user
export async function POST(req: NextRequest, res: NextResponse) {

  const credentials: {username: string, password: string} = await req.json()

  if(!credentials.username){
    return new Response(JSON.stringify({user: null}))
  }

  if(!credentials.password) {
    return new Response(JSON.stringify({user: null}))
  }

  // make prisma call to get user
  let DBuser = await prisma.user.findUnique({
        where: {
          username: credentials.username
        }
  }) as unknown as DBuser || null
  
  // Check if user exist
  if(!DBuser) {
    return NextResponse.json({error: "Username does not exist"}, {
      status: 404,
    })
  }
  
  // Confirm password match (for non-social-media users)
  if(!DBuser.socialmediaUser){
    let isMatchPassword = await bcrypt.compare(credentials.password, DBuser.password)
    if (!isMatchPassword){
      return NextResponse.json({error: "Password is incorrect"}, {
        status: 401,
      })
    }
    DBuser.password = ""
  }

  // Send a JWT cookie to user
  const jwtToken = await new SignJWT({...DBuser, cart: null})
                .setProtectedHeader({alg: "HS256"})
                .setJti(nanoid()) 
                .setIssuedAt()
                .setExpirationTime("60m")
                .sign(jwtSecret)

  const serializedJWT = cookie.serialize("user-token", jwtToken, cookieOptions)

  return  NextResponse.json({user: DBuser}, {
    headers: { 
      "Set-Cookie": serializedJWT,
    }
  })

}