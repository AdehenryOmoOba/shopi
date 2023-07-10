import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";


export const nextAuthOptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: "/login"
    },
}

const handler = NextAuth(nextAuthOptions)

export {handler as GET, handler as POST}