import type {
  SanityImageCrop as SanityCrop,
  SanityImageHotspot as SanityHotspot,
} from './sanity.types'

// Types expected by the sanity-image package
export type ImageCrop = {
  top: number
  bottom: number
  left: number
  right: number
}

export type ImageHotspot = {
  x: number
  y: number
}

// Our component types that combine Sanity and UI requirements
export type SanityImageObject = {
  _type: 'image'
  _key?: string
  asset?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
    [internalGroqTypeReferenceTo]?: 'sanity.imageAsset'
  }
  hotspot?: Partial<SanityHotspot>
  crop?: Partial<SanityCrop>
}

// Declare the symbol used in Sanity types
declare const internalGroqTypeReferenceTo: unique symbol
