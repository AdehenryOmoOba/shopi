import './globals.css'
import {Metadata} from 'next'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import AppContextProvider from '@/utils/context/appContextProvider'
import Notification from './components/notification/Notification'


export default function RootLayout({children}: {children: React.ReactNode}) {

  return (
    <html lang="en">
      <head>
        <title>Shopi : Home</title>
        <meta name='description' content='e-commerce store' />
        <meta name='viewport' content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no' />
      </head>
       <AppContextProvider>
        <body>
         <header className='h-28 mx-auto w-full md:w-[90vw] lg:w-[80vw]'>
           <Navbar />
         </header>
          <main className='flex justify-center mx-auto px-5 md:w-[90vw] lg:w-[80vw]'>
            {children}
            <Notification />
          </main>
         <Footer />
        </body>
      </AppContextProvider>
    </html>
  )
}
