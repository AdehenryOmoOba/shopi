import NextAuth, {type NextAuthOptions} from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";


export const authOptions: NextAuthOptions = {
    session: {
        strategy: "jwt"
    },
    providers: [
        CredentialsProvider({
            name: "Sign In",
            credentials: {
                username: {label: "Username", type: "text"},
                password: {label: "Password", type: "password"},
            },
            async authorize(credentials) {
                //   handle auth 
                console.log({credentials})
                if(!credentials?.username) return null
                const user = { id: "1", name: credentials.username, email: "bobo@gmail.com", phone: "09036554777", image: 'https://firebase/img'};
                return user;
            },
        })
    ],
    pages: {
        signIn: "/login"
    }
}

const handler = NextAuth(authOptions)
export {handler as GET, handler as POST}