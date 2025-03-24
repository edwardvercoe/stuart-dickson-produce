import '@/app/globals.css'

import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { VisualEditing } from 'next-sanity'

import { Footer } from '@/components/global/Footer'
import { Navbar } from '@/components/global/Navbar'
import { SanityLive } from '@/sanity/lib/live'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { loadHomePage, loadSettings } from '@/sanity/loader/loadQuery'


export async function generateMetadata(): Promise<Metadata> {
  const [{ data: settings }, { data: homePage }] = await Promise.all([
    loadSettings(),
    loadHomePage(),
  ])

  const ogImage = urlForOpenGraphImage(settings?.ogImage)
  
  return {
    title: homePage?.title
      ? {
          template: `%s | ${homePage.title}`,
          default: homePage.title || 'Stuart Dickson Produce',
        }
      : undefined,
    description: homePage?.overview
      ? toPlainText(homePage.overview)
      : undefined,
    openGraph: {
      images: ogImage ? [ogImage] : [],
    },
  }
}

export const viewport: Viewport = {
  themeColor: '#000',
}

export default async function IndexRoute({
  children,
}: {
  children: React.ReactNode
}) {
  const isDraftMode = (await draftMode()).isEnabled

  return (
    <>
      <div className="flex min-h-screen flex-col bg-secondary text-black">
        <Suspense>
          <Navbar />
        </Suspense>

        <div className="flex-grow">
          {isDraftMode ? (
            <>
              <div data-sanity-live>{children}</div>
              <VisualEditing />
            </>
          ) : (
            <Suspense>
              {children}
            </Suspense>
          )}
        </div>

        <Suspense>
          <Footer />
        </Suspense>
      </div>

      <Suspense>
        <SanityLive />
      </Suspense>
    </>
  )
}
