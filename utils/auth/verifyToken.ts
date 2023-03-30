import { jwtVerify, SignJWT } from "jose"

type TjwtTPayload = {
    jti: string
    iat: number
}

const jwtSecret = new TextEncoder().encode(process.env.JWT_SECRET_KEY)

export async function verifyToken(token: string) {
  
  try {
    const verified = await jwtVerify(token, jwtSecret)
    return verified.payload as TjwtTPayload 
  } catch (error) {
    throw new Error("Your token has expired")
  }
}