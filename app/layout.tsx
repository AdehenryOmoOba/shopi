import './globals.css'
import {Metadata} from 'next'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import SearchProvider from '@/utils/context/searchContext'

export const metadata: Metadata = {
  title : 'Adehenry : Home Page',
  description: 'Fullstack Application Template'
}

export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <head />
      <body>
        <header className='h-28 mx-auto w-full md:w-[90vw] lg:w-[80vw]'>
          <Navbar />
        </header>
        <SearchProvider>
         <main className='mx-auto px-5 md:w-[90vw] lg:w-[80vw]'>
           {children}
         </main>
        </SearchProvider>
        <Footer />
      </body>
    </html>
  )
}
