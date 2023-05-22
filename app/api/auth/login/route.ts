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
    return  NextResponse.json(verifiedToken)
  } catch (error) {
  return  NextResponse.json({error: error.message}, {status: 401})
  }
}

// Login user
export async function POST(req: NextRequest, res: NextResponse) {

  const credentials: {username: string, password: string} = await req.json()

  console.log("credentials from login API ",credentials)

  if(!credentials.username) return NextResponse.json({user: null}, {status: 401, statusText: "Username not provided"})

  if(!credentials.password) return NextResponse.json({user: null}, {status: 401, statusText: "Password not provided"})

  // make prisma call to get user
  const DBuser = await prisma.user.findUnique({
         where: {
           name: credentials.username
         }
       }) as DBuser || null

  console.log("user from DB: ", DBuser)
  
  // Check if user exist
  if(!DBuser) {
    return NextResponse.json({user: null}, {
      status: 404,
      statusText: "Username does not exist"
    })
  }
  // Confirm password match (for non-social-media users)
  if(!DBuser.socialmediaUser){
    let isMatchPassword = await bcrypt.compare(credentials.password, DBuser.password)
    if (!isMatchPassword){
      return NextResponse.json({user: null}, {
        status: 401,
        statusText: "Password is incorrect"
      })
    }
  }

  const user: TLoginResponse = { 
    success: DBuser ? true : false,
    user: DBuser
  }

  // Send a JWT cookie to user
  const jwtToken = await new SignJWT(user)
                .setProtectedHeader({alg: "HS256"})
                .setJti(nanoid()) 
                .setIssuedAt()
                .setExpirationTime("60m")
                .sign(jwtSecret)

  const serializedJWT = cookie.serialize("user-token", jwtToken, cookieOptions)

  return  NextResponse.json(user, {
    headers: { "Set-Cookie": serializedJWT}
  })

}