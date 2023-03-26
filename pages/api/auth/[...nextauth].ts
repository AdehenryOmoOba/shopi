import NextAuth from "next-auth/next";
import CredentialsProvider from 'next-auth/providers/credentials'


export default NextAuth({
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            async authorize(credentials, req) {
                const { username } = credentials;
                if (username) return {id: '1', email: 'ade@gmail.com', phone: '08031112345', name: username}
                throw new Error("Error validating user")
            },
            credentials: undefined
        })
    ],
    pages: {
        signIn: '/login',
    },
    secret: process.env.NEXTAUTH_SECRET
})