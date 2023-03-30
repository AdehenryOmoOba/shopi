import { NextRequest, NextResponse } from "next/server";
import { verifyToken } from "./utils/auth/verifyToken";

export async function middleware(req: NextRequest) {

    const path = new URL(req.url).pathname
    console.log(path)

    const token = req.cookies.get("user-token")?.value

    let verifiedToken: unknown;

    if(token){
        verifiedToken = await verifyToken(token)
        .catch((error) => console.log(error.message))
    }
    
    if(!verifiedToken && path.startsWith('/secret-page')){
        return NextResponse.redirect("http://localhost:3000/login")
    }

    if(verifiedToken && path.startsWith('/login')){
        return NextResponse.redirect("http://localhost:3000")
    }
}

export const config = {
    matcher: [
        '/secret-page', '/login'
    ]
}