import './globals.css'

import { GoogleAnalytics } from '@next/third-parties/google'
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
      {process.env.NEXT_PUBLIC_GTM_ID && (
        <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GTM_ID} />
      )}
      <body>{children}</body>
    </html>
  )
}
