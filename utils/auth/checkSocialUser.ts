import origin from "../origin"

export async function checkSocialUser() {

  const response = await fetch(`${origin}api/socialLogin/githubCheckUser`, {
    cache: "no-store"
  })
  
  if(!response.ok) return {error: "user not logged in"}
  
  const user = await response.json()  

  return user
    
}