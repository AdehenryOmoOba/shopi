import origin from "../origin"

export async function checkUser() {

  const response = await fetch(`${origin}api/auth/login`, {
    cache: "no-store"
  })

  if(!response.ok) throw("user not logged in")

  const user = await response.json()  
    
  return user
    
}