import Link from 'next/link'
import React from 'react'

import { cn } from '@/lib/utils'

type SanityLinkProps = {
  data: LinkType
  children: React.ReactNode
  internalLink?: boolean
  className?: string
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
  className,
}: SanityLinkProps) => {
  if (!data) {
    return <span>{children}</span>
  }

  if (data.linkType === 'internal' || internalLink) {
    const href = resolveHref(
      data.internalLink?._type || data._type,
      data.internalLink?.slug || data.slug,
    )
    return (
      <Link className={cn(className)} href={href}>
        {children}
      </Link>
    )
  }
  if (data?.linkType === 'external') {
    return (
      <a
        className={cn(className)}
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

export const InternalLinkWrapper = ({
  documentType,
  slug,
  children,
  className,
}) => {
  const href = resolveHref(documentType, slug)
  return (
    <Link href={href} className={cn('relative', className)}>
      {children}
    </Link>
  )
}

export default SanityLink
