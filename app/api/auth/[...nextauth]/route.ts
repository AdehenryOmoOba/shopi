import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            credentials: {
                username: {type: "text"},
                password: {type: "password"},
            },
            async authorize(credentials) {
                //   handle auth 
                console.log({credentials})
                if(credentials.username !== "ade") throw new Error("wrong username!")
                const user = { id: "1", name: credentials.username, email: "bobo@gmail.com", phone: "09036554777", image: 'https://firebase/img'};
                return user;
            },
        })
    ],
    callbacks: {
       jwt: ({token, user}) => {
          token = {...token, ...user}
          return token
       },
       session({token, session}) {
        console.log("from session callback ",token)
           session.user = {...session.user, ...token}
           session.user.image = null
           return session
       },
    },
    pages: {
        signIn: "/login",
        error: '/login'
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}