// https://github.com/coreyward/sanity-image
'use client'
import { ReactElement } from 'react'
import { SanityImage } from 'sanity-image'

import { dataset, projectId } from '@/sanity/lib/api'
import { urlForImage } from '@/sanity/lib/utils'

export type SanityImageObject = {
  _type: 'image'
  _key?: string
  asset: {
    _ref: string
    _type: string
    altText?: string
    _id: string
  }
}

type SanityImgProps = {
  src: SanityImageObject
  mode?: 'cover' | 'contain'
  loading?: 'lazy' | 'eager'
  className?: string
}

export const SanityImg = ({
  src,
  mode = 'cover',
  loading,
  className = '',
}: SanityImgProps): ReactElement => {
  const altText = src?.asset?.altText ?? 'Image'
  if (!src) {
    console.error('SanityImg component received undefined `src` object.')
    return <></>
  }
  const previewUrl = urlForImage(src)?.width(24)?.height(24)?.blur(20)?.url()

  return (
    <SanityImage
      // Pass the Sanity Image ID (`_id`) (e.g., `image-abcde12345-1200x800-jpg`)
      id={src.asset._ref || src.asset._id}
      baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
      alt={altText}
      preview={previewUrl}
      mode={mode}
      loading={loading || 'lazy'}
      className={`${className}`}
    />
  )
}

export default SanityImg
