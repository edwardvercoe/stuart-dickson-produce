import type { Metadata, Viewport } from 'next'
import { Suspense } from 'react'
import { draftMode } from 'next/headers'
import { toPlainText } from 'next-sanity'
import { VisualEditing } from 'next-sanity'

import { Footer } from '@/components/Footer'
import { Navbar } from '@/components/Navbar'
import { SanityLive } from '@/sanity/lib/live'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { sanityFetchWithDefaults } from '@/sanity/lib/live'
import { settingsQuery, homePageQuery } from '@/sanity/lib/queries'
import type { SettingsPayload, HomePagePayload } from '@/types'

export async function generateMetadata(): Promise<Metadata> {
  const [
    { data: settings },
    { data: homePage }
  ] = await Promise.all([
    sanityFetchWithDefaults<SettingsPayload>({
      query: settingsQuery,
      stega: false,
    }),
    sanityFetchWithDefaults<HomePagePayload>({
      query: homePageQuery,
      stega: false,
    })
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
  
  const { data: settings } = await sanityFetchWithDefaults<SettingsPayload>({
    query: settingsQuery,
  })

  return (
    <>
      <div className="flex min-h-screen flex-col bg-secondary text-black">
        <Suspense>
          <Navbar settings={settings} />
        </Suspense>

        <div className="flex-grow">
          {isDraftMode ? (
            <>
              <div data-sanity-live>{children}</div>
              <VisualEditing />
              <div className="text-center fixed bottom-0 left-0 right-0 bg-black text-white z-[999] py-4">
                <p>
                  Draft MODE ON
                </p>
              </div>
            </>
          ) : (
            <Suspense>
              {children}
            </Suspense>
          )}
        </div>

        <Suspense>
          <Footer settings={settings} />
        </Suspense>
      </div>

      <Suspense>
        <SanityLive />
      </Suspense>
    </>
  )
}
