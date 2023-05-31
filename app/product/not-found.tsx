import Link from "next/link"

export default async function NotFound() {
  
  return (
    <div className='flex items-center justify-center flex-col place-content-center h-[50vh]'>
      <p className='text-3xl mb-5'>404 | Oops! Page not found 😥</p>
      <Link href='/' className="py-1 px-4 rounded text-sm font-extrabold hover:text-white transition-colors bg-slate-800 w-max">Go Home</Link>
    </div>
  )
}