import Link from "next/link"
import {HiOutlineArrowNarrowLeft} from "react-icons/hi"

export default async function NotFound() {
  
  return (
    <div className='flex items-center justify-center flex-col place-content-center h-[50vh]'>
      <p className='text-3xl mb-5'>404 | Oops! Page not found 😥</p>
      <Link href="/" className="py-2 px-4 rounded text-sm font-bold bg-slate-800 mt-4 focus:outline-none focus:shadow-outline hover:text-white transition-colors flex items-center gap-x-2">
        <HiOutlineArrowNarrowLeft />
        Go Back
      </Link>
    </div>
  )
} 