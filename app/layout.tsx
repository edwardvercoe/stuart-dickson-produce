import './globals.css'

import { Rubik } from 'next/font/google'

const rubik = Rubik({
  variable: '--font-rubik',
  subsets: ['latin'],
  weight: ['400', '500', '700'],
})

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={` ${rubik.variable}`}>
      <body>{children}</body>
    </html>
  )
}
