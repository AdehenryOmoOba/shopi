import NextAuth,{type NextAuthOptions} from "next-auth"
import CredentialProvider from "next-auth/providers/credentials"
import GoogleProvider from "next-auth/providers/google"


export const authOptions: NextAuthOptions = {
  
  session: {
     strategy: "jwt"
  },
  providers: [
    CredentialProvider({
      name: "Sign in",
      credentials: {
        email: {
            label: 'Email',
            type: 'email',
            placeholder: "someone@example.com"
        },
        password: {
            label: "Password",
            type: "password"
        },
      },
      async authorize(credentials, req){
          // Handle auth
          const {email, password} = credentials!
          const user = {id: '1', name: 'ade', email: 'ade@gmail.com', password: "abc"}
          if(email === user.email && password === user.password) return user
          throw new Error("Error validationg user")
      }

    }),
    // ...add more providers here
    GoogleProvider({
       clientId: process.env.GOOGLE_OAUTH_CLIENT_ID!,
       clientSecret: process.env.GOOGLE_OAUTH_CLIENT_SECRET!
    })
  ],
}

const handler =  NextAuth(authOptions)
export  {handler as GET, handler as POST}