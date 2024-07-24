import { groq } from 'next-sanity'

// @TODO: finish query for page builder
const PageBuilderQuery = groq`
  pageBuilder[] {
    ...,
    _type == "hero" => {
      ...,
      buttons[] {
      ...,
      "internalLink" : internalLink->{"slug": slug.current,_type}
      },
    },
    _type == "featuredCTA" => {
      ...,
      buttons[] {
      ...,
      "internalLink" : internalLink->{"slug": slug.current,_type}
      },
    },
    _type == "carouselCTA" => {
      ...,
      carouselItems[] {
        ...,
        "page": page->{...,"slug": slug.current,_type},
      },
    },
  }
`

export const homePageQuery = groq`
  *[_type == "home"][0]{
   ...,
   ${PageBuilderQuery}
  }
`

export const pagesBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug][0] {
    ...,
    ${PageBuilderQuery}
  }
`

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug][0] {
    _id,
    client,
    coverImage,
    description,
    duration,
    overview,
    site,
    "slug": slug.current,
    tags,
    title,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    footer,
    menuItems[] {
      ...,
      "internalLink" : internalLink->{"slug": slug.current,_type},
    },
    ogImage,
  }
`
