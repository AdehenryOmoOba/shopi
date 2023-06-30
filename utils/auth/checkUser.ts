
export async function checkUser() {

  try {
    
  const response = await fetch("http://localhost:3000/api/auth/login")

  if(!response.ok) throw("user not logged in")

  const user = await response.json()  
    
  return user
    
  } catch (error) {
    console.log(error.message)
    return null
  }

}