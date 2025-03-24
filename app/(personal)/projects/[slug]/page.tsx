import type { Metadata, ResolvingMetadata } from 'next'
import { notFound } from 'next/navigation'
import { toPlainText } from 'next-sanity'

import { ProjectPage } from '@/components/pages/project/ProjectPage'
import { sanityFetchWithDefaults } from '@/sanity/lib/live'
import { projectBySlugQuery } from '@/sanity/lib/queries'
import { urlForOpenGraphImage } from '@/sanity/lib/utils'
import { generateStaticSlugs } from '@/sanity/loader/generateStaticSlugs'
import type { ProjectPayload } from '@/types'

type Props = {
  params: { slug: string }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { data: project } = await sanityFetchWithDefaults<ProjectPayload>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
    // Metadata should never contain stega
    stega: false,
  })

  const ogImage = urlForOpenGraphImage(project?.coverImage)

  return {
    title: project?.title,
    description: project?.overview
      ? toPlainText(project.overview)
      : (await parent).description,
    openGraph: ogImage
      ? {
          images: [ogImage, ...((await parent).openGraph?.images || [])],
        }
      : {},
  }
}

export function generateStaticParams() {
  return generateStaticSlugs('project')
}

export default async function ProjectSlugRoute({ params }: Props) {
  const { data } = await sanityFetchWithDefaults<ProjectPayload>({
    query: projectBySlugQuery,
    params: { slug: params.slug },
  })

  if (!data) {
    notFound()
  }

  return <ProjectPage data={data} />
}
