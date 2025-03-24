import dynamic from 'next/dynamic'
import { draftMode } from 'next/headers'
import { notFound } from 'next/navigation'
import { Page } from '@/components/pages/page/Page'
import { defineSanityMetadata } from '@/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import { loadPage, loadSettings } from '@/sanity/loader/loadQuery'
const PagePreview = dynamic(() => import('@/components/pages/page/PagePreview'))

type Props = {
  params: Promise<{ slug: string }>
}

export async function generateMetadata(props: Props) {
  const params = await props.params;
  const [{ data: settings }, { data: page }] = await Promise.all([
    loadSettings(),
    loadPage(params.slug),
  ])

  return defineSanityMetadata(page, settings)
}

export function generateStaticParams() {
  return generateStaticSlugs('page')
}

export default async function PageSlugRoute(props: Props) {
  const params = await props.params;
  const initial = await loadPage(params.slug)

  if ((await draftMode()).isEnabled) {
    return <PagePreview params={params} initial={initial} />
  }

  if (!initial.data) {
    notFound()
  }

  return <Page data={initial.data} />
}
