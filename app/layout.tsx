import './globals.css'
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
        <meta property='og:image' content='https://firebasestorage.googleapis.com/v0/b/ecommerce-f8b0d.appspot.com/o/sample_images%2Fshopi_screenshot.png?alt=media&token=fdde00a6-62a2-475e-a1a4-52b27f2a936e' />
        <meta property='og:image:width' content='1200' /> 
        <meta property='og:image:height' content='630' /> 
      </head>
       <AppContextProvider>
        <body>
         <header className='h-28 w-full'>
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
