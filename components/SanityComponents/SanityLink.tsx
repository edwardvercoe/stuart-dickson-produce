import Link from 'next/link'
import React from 'react'

type SanityLinkProps = {
  data: LinkType
  children: React.ReactNode
  internalLink?: boolean
}

type LinkType = {
  _type: 'link'
  linkText?: string | undefined
  linkType?: 'internal' | 'external' | 'anchor' | undefined
  externalUrl?: string | undefined
  internalLink?: any
  newWindow?: boolean | undefined
  anchor?: string | undefined
  slug?: string | undefined
}

function resolveHref(documentType?: string, slug?: string): string {
  if (!documentType && !slug) {
    return '/'
  }
  switch (documentType) {
    case 'home':
      return '/'
    case 'page':
      return `/${slug}`
    case 'project':
      return `/projects/${slug}`
    case 'farm':
      return `/farms/${slug}`
    default:
      // console.warn("Invalid document type:", documentType);
      return '/'
  }
}

export const SanityLink = ({
  data,
  children,
  internalLink = false,
}: SanityLinkProps) => {
  if (!data) {
    return <span>{children}</span>
  }

  if (data.linkType === 'internal' || internalLink) {
    const href = resolveHref(
      data.internalLink?._type || data._type,
      data.internalLink?.slug || data.slug,
    )
    return <Link href={href}>{children}</Link>
  }
  if (data?.linkType === 'external') {
    return (
      <a
        href={data?.externalUrl}
        target={data?.newWindow ? '_blank' : ''}
        rel="noreferrer"
      >
        {children}
      </a>
    )
  }
  return <span>{children}</span>
}

export default SanityLink
