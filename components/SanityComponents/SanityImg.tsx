// https://github.com/coreyward/sanity-image
'use client'
import { ReactElement } from 'react'
import { SanityImage } from 'sanity-image'

import { dataset, projectId } from '@/sanity/lib/api'
import { urlForImage } from '@/sanity/lib/utils'
import type {
  ImageCrop,
  ImageHotspot,
  SanityImageObject,
} from '@/types/component.types'

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
  if (!src) {
    console.error('SanityImg component received undefined `src` object.')
    return <></>
  }

  // @ts-expect-error - TODO: fix this
  const previewUrl = urlForImage(src)?.width(24)?.height(24)?.blur(20)?.url()

  // Convert Sanity crop/hotspot to format expected by sanity-image
  const crop: ImageCrop | undefined = src.crop
    ? {
        left: src.crop.left ?? 0,
        right: src.crop.right ?? 0,
        top: src.crop.top ?? 0,
        bottom: src.crop.bottom ?? 0,
      }
    : undefined

  const hotspot: ImageHotspot | undefined = src.hotspot
    ? {
        x: src.hotspot.x ?? 0.5,
        y: src.hotspot.y ?? 0.5,
      }
    : undefined

  return (
    <SanityImage
      id={src.asset?._ref ?? ''}
      baseUrl={`https://cdn.sanity.io/images/${projectId}/${dataset}/`}
      alt="Image" // We'll need to handle alt text differently since it's on the asset
      preview={previewUrl}
      mode={mode}
      loading={loading || 'lazy'}
      className={className}
      crop={crop}
      hotspot={hotspot}
    />
  )
}

export default SanityImg
