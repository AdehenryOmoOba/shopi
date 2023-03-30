
export async function signOut(){
 try {
    await fetch("http://localhost:3000/api/auth/logout")
    return {success: "logged out successfully"}
 } catch (error: any) {
    return {error: "Something went wrong, try loging out again"}
 }
}