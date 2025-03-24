import { notFound } from 'next/navigation'

import { Page } from '@/components/pages/page/Page'
import { defineSanityMetadata } from '@/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { pagesBySlugQuery, settingsQuery } from '@/sanity/lib/queries'
import { sanityFetchWithDefaults } from '@/sanity/lib/live'
import type { PagePayload, SettingsPayload } from '@/types'

type Props = {
  params: Promise<{ slug: string }> | { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const resolvedParams = await params
  const [{ data: settings }, { data: page }] = await Promise.all([
    sanityFetchWithDefaults<SettingsPayload>({
      query: settingsQuery,
      stega: false,
    }),
    sanityFetchWithDefaults<PagePayload>({
      query: pagesBySlugQuery,
      params: { slug: resolvedParams.slug },
      stega: false,
    }),
  ])

  return defineSanityMetadata(page, settings)
}

export function generateStaticParams() {
  return generateStaticSlugs('page')
}

export default async function PageSlugRoute({ params }: Props) {
  const resolvedParams = await params
  const { data } = await sanityFetchWithDefaults<PagePayload>({
    query: pagesBySlugQuery,
    params: { slug: resolvedParams.slug },
  })

  if (!data) {
    notFound()
  }

  return <Page data={data} />
}
