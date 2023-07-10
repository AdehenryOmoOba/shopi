import origin from "../origin"


export type SLProps = {
    name: string
    email: string
}

export default async function socialLogin(data: SLProps){
  try {
    const res = await fetch(`${origin}api/socialLogin/githubLogin`, {
        method: "POST",
        body: JSON.stringify(data),
      })
      const response = await res.json()
      return {success: true, data: response}
  } catch (error) {
      return {success: false, error: error.message}
  }
}