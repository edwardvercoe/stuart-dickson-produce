import Link from 'next/link'

import { HomePage } from '@/components/pages/home/HomePage'
import { defineSanityMetadata } from '@/lib/utils'
import { studioUrl } from '@/sanity/lib/api'
import { homePageQuery } from '@/sanity/lib/queries'
import { sanityFetchWithDefaults } from '@/sanity/lib/live'
import type { HomePagePayload } from '@/types'
import { notFound } from 'next/navigation'

export async function generateMetadata() {
  const { data: homePage } = await sanityFetchWithDefaults<HomePagePayload>({
    query: homePageQuery,
    // Metadata should never contain stega
    stega: false,
  })
  return defineSanityMetadata(homePage, null)
}

export default async function IndexRoute() {
  const { data } = await sanityFetchWithDefaults<HomePagePayload>({
    query: homePageQuery,
  })

  if (!data) {
    return notFound()
  }

  return <HomePage data={data} />
}
