import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";


const options: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/login"
    },
    secret: process.env.NEXTAUTH_SECRET
}

const handler = NextAuth(options)

export {handler as GET, handler as POST}