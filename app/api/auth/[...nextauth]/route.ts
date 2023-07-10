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
    secret: "KWEVPOM3M3F33F33PMFP"
}

const handler = NextAuth(options)

export {handler as GET, handler as POST}