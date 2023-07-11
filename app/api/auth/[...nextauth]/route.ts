import NextAuth from "next-auth/next"
import { NextAuthOptions } from "next-auth"
import GithubProvider from "next-auth/providers/github";
import origin from "@/utils/origin";


const nextAuthoptions: NextAuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
        }),
    ],
    pages: {
        signIn: `${origin}login`
    },
    secret: "KWEVPOM3M3F33F33PMFP",
}

const handler = NextAuth(nextAuthoptions)

export {handler as GET, handler as POST}