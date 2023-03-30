
type TCredentials = {
    username: string
    password: string
}

async function signIn(credentials: TCredentials) {

  try {
    const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        body: JSON.stringify(credentials)
      })

    if(!response.ok) throw new Error(response.statusText)
    const data = await response.json()  
    return {success: true, data}
  } catch (error: any) {
    return {success: false, error: error.message}
  }
}

export default signIn