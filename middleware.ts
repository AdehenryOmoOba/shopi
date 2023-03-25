// middleware.ts
import { withAuth } from "next-auth/middleware"

export default withAuth(
  function middleware(req) {
    console.log("from middleware", req.nextauth.token)
  }
)


// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/secrete-page"]
}