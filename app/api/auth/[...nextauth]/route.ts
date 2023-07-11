import NextAuth from "next-auth/next"
import { nextAuthoptions } from "./nextAuthOptions"


const handler = NextAuth(nextAuthoptions)

export {handler as GET, handler as POST}