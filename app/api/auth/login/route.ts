import { NextRequest, NextResponse } from 'next/server'
import {SignJWT, jwtVerify} from "jose"
import { nanoid } from 'nanoid'
import cookie from 'cookie'

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)
export const cookieOptions = {httpOnly: true, path: '/', secure: process.env.NODE_ENV === "production", maxAge: 3600}

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

export async function POST(req: NextRequest, res: NextResponse) {

  const credentials: {username: string, password: string} = await req.json()

  console.log("credentials from login API ",credentials)

  if(!credentials.username) return NextResponse.json({user: null}, {status: 401, statusText: "Username not provided"})

  if(!credentials.password) return NextResponse.json({user: null}, {status: 401, statusText: "Password not provided"})

   // make prisma call to get user
  const user:TVendor = {id: "1", name: credentials.username, phone: "08031234567", email: 'someone@example.com'}

  // Send a JWT cookie to user
  const jwtToken = await new SignJWT(user)
                .setProtectedHeader({alg: "HS256"})
                .setJti(nanoid()) 
                .setIssuedAt()
                .setExpirationTime("60m")
                .sign(jwtSecret)

  const serializedCookie = cookie.serialize("user-token", jwtToken, cookieOptions)

  return  NextResponse.json(user, {
    headers: { "Set-Cookie": serializedCookie}
  })

}