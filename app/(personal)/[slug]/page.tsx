import type { Metadata } from 'next'
import { notFound } from 'next/navigation'

import { Page } from '@/components/pages/page/Page'
import { defineSanityMetadata } from '@/lib/utils'
import { sanityFetchWithDefaults } from '@/sanity/lib/live'
import { pagesBySlugQuery, settingsQuery } from '@/sanity/lib/queries'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import type { PagePayload, SettingsPayload } from '@/types'

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params
  const [{ data: settings }, { data: page }] = await Promise.all([
    sanityFetchWithDefaults<SettingsPayload>({
      query: settingsQuery,
      stega: false,
    }),
    sanityFetchWithDefaults<PagePayload>({
      query: pagesBySlugQuery,
      params: { slug: params.slug },
      stega: false,
    }),
  ])

  return defineSanityMetadata(page, settings)
}

export function generateStaticParams() {
  return generateStaticSlugs('page')
}

export default async function PageSlugRoute(props: Props) {
  const params = await props.params
  const { data } = await sanityFetchWithDefaults<PagePayload>({
    query: pagesBySlugQuery,
    params: { slug: params.slug },
  })

  if (!data) {
    notFound()
  }

  return <Page data={data} />
}
