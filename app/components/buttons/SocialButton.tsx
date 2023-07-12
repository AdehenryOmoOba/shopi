"use client"

export default function SocialButton ({children, action, isLoading, svgColor = "text-white"}) {

return (<button onClick={action} className="flex items-center bg-black w-full rounded-md h-10 relative my-2" disabled={isLoading}>
         <div className={`flex gap-x-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 ${isLoading ? "opacity-0" : "opacity-100" }`}>
          {children}
         </div>

         <div className={`absolute left-1/2 top-1/4 -translate-x-1/2 w-max h-5 mr-3 -ml-1 ${isLoading ? "opacity-100" : "opacity-0" }`}>
          <svg className={`${svgColor} absolute left-0 bottom-[0.5px] -translate-x-1/2 -rotate-[360] w-5 h-5 mr-3 -ml-1 ${isLoading ? "animate-spin" : ""}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="relative left-6 bottom-[2px]">Please wait...</p>
         </div>
        </button>)

} 