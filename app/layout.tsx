import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Navbar from './components/navbar/Navbar'
import RegisterModal from './components/modal/RegisterModal'
import ToasterProvider from './providers/ToasterProvider'

export const metadata: Metadata = {
  title: 'Airbnb',
  description: 'Created by Akarsh Sharma | Airbnb',
}

const font = Nunito({
  subsets: ["latin"],
})

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={font.className}>
        <ToasterProvider/>
        <RegisterModal/>
        <Navbar/>
        {children}
        </body>
    </html>
  )
}