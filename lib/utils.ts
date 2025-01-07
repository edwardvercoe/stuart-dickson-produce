import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

import { defineMetadata } from './utils.metadata'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function defineSanityMetadata(page: any | null, settings?: any | null) {
  return defineMetadata({
    baseTitle: settings?.seo?.title,
    description: page?.seo?.description || settings?.seo?.description || '',
    image: page?.seo?.image || settings?.seo?.image || {},
    title: page?.seo?.title || settings?.seo?.title || '',
  })
}
