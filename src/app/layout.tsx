import './globals.css'
import { Inter } from 'next/font/google'
import DataProvider from '@/components/DataProvider'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Trainingsplan',
  description: 'Mein Trainingsplan für den Muskelaufbau',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}><DataProvider>{children}</DataProvider></body>
    </html>
  )
}
