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
        <header className='h-28 w-full grid place-content-center'>
          <Navbar />
        </header>
        <SearchProvider>
         <main>
           {children}
         </main>
        </SearchProvider>
        <Footer />
      </body>
    </html>
  )
}
