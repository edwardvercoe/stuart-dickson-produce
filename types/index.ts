import type { PortableTextBlock } from 'next-sanity'
import type { Image } from 'sanity'

export interface MenuItem {
  _type: string
  slug?: string
  title?: string
}

export interface MilestoneItem {
  description?: string
  duration?: {
    start?: string
    end?: string
  }
  image?: Image
  tags?: string[]
  title?: string
}

export interface ShowcaseProject {
  _type: string
  coverImage?: Image
  overview?: PortableTextBlock[]
  slug?: string
  tags?: string[]
  title?: string
}

// Page payloads

export interface HomePagePayload {
  footer?: PortableTextBlock[]
  pageBuilder?: any
  title?: string
  overview?: PortableTextBlock[]
}

export interface PagePayload {
  body?: PortableTextBlock[]
  name?: string
  overview?: PortableTextBlock[]
  title?: string
  slug?: string
}

export interface ProjectPayload {
  client?: string
  coverImage?: Image
  description?: PortableTextBlock[]
  duration?: {
    start?: string
    end?: string
  }
  overview?: PortableTextBlock[]
  site?: string
  slug: string
  tags?: string[]
  title?: string
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

export interface SettingsPayload {
  footer?: PortableTextBlock[]
  menuItems?: LinkType[]
  ogImage?: Image
}
