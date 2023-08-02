import { NextRequest, NextResponse } from "next/server"
import { cookieOptions } from "../login/route"
import {SignJWT} from "jose"
import { nanoid } from 'nanoid'
import cookie from 'cookie'


const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export async function GET(req: NextRequest, res: NextResponse) {
  
  try {
    // Expire cookie
  const jwtToken = await new SignJWT({})
  .setProtectedHeader({alg: "HS256"})
  .setJti(nanoid()) 
  .setIssuedAt()
  .setExpirationTime("0m")
  .sign(jwtSecret)

  const serializedCookie = cookie.serialize("user-token", jwtToken, {...cookieOptions, maxAge: -1})

  console.log("Logout successful")

  return  NextResponse.json(null, {
    headers: {
      "Set-Cookie": serializedCookie
    }
  })
  } catch (error: any) {
    return  NextResponse.json({error: "something went wrong"}, {
      status: 500,
    })
  }
}  

