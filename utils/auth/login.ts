import origin from "../origin"


type TCredentials = {
    username: string
    password: string
}

async function signIn(credentials: TCredentials) {

  try {
    const response = await fetch(`${origin}api/login`, {
        method: "POST",
        body: JSON.stringify(credentials)
      })

    const data = await response.json() 

      if(data.error) {
      throw new Error(data.error)
    }

    return {success: true, data}
  } catch (error: any) {
    return {success: false, error: error.message}
  }
}

export default signIn