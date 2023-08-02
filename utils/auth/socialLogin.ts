import origin from "../origin"


export type SLProps = {
    name: string
    email: string
}

export default async function socialLogin(email: string){
  try {
    const res = await fetch(`${origin}api/socialLogin/githubLogin`, {
        method: "POST",
        body: JSON.stringify({email}),
      })
      const response = await res.json()
      return {success: true, data: response}
  } catch (error) {
      return {success: false, error: error.message}
  }
}