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
        buttons[] {
        ...,
        "internalLink" : internalLink->{"slug": slug.current,_type}
        },
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
    ...,
    "slug": slug.current,
  }
`

export const settingsQuery = groq`
  *[_type == "settings"][0]{
    ...,
    menuItems[] {
      ...,
      "internalLink" : internalLink->{"slug": slug.current,_type},
    },
  }
`

export const categoriesWithProductsQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    title,
    "slug": slug.current,
    columnPlacement,
    "products": *[_type == "product" && references(^._id)] | order(order asc) {
      _id,
      title,
      "slug": slug.current,
      available,
      notes
    }
  }
`
