import origin from "../origin"


export async function signOut(){
 try {
    await fetch(`${origin}api/auth/logout`, {
      cache: "no-store"
    })
    return {success: "logged out successfully"}
 } catch (error: any) {
    return {error: "Something went wrong, try loging out again"}
 }
}