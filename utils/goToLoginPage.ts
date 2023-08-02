import { useRouter } from "next/navigation";
 
export function useGoToLoginPage(){
  const router = useRouter()

  return () => {
    router.push("/login")
  }
}
