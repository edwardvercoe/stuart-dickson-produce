import type { Metadata, ResolvingMetadata } from 'next'
import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { Page } from '@/components/pages/page/Page'
import { defineSanityMetadata } from '@/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPage, loadSettings } from '@/sanity/loader/loadQuery'
const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Props = {
  params: { slug: string }
}

export async function generateMetadata({ params }: Props) {
  const [{ data: settings }, { data: page }] = await Promise.all([
    loadSettings(),
    loadPage(params.slug),
  ])

  return defineSanityMetadata(page, settings)
}

export function generateStaticParams() {
  return generateStaticSlugs('page')
}

export default async function PageSlugRoute({ params }: Props) {
  const initial = await loadPage(params.slug)

  if (draftMode().isEnabled) {
    return <PagePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Page data={initial.data} />
}
