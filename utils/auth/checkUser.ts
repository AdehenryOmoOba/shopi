
export async function checkUser() {

  const response = await fetch("http://localhost:3000/api/auth/login")

  if(!response.ok) return null

  const user = await response.json()  
    
  return user
}