import React from 'react'

import CarouselCTA from '@/components/shared/CarouselCTA'
import FeaturedCTA from '@/components/shared/FeaturedCTA'
import Hero from '@/components/shared/Hero/Hero'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'

import ImageCarousel from './ImageCarousel'
import TwoColText from './TwoColText/TwoColText'
import TwoImages from './TwoImages/TwoImages'

type PageBuilderProps = {
  data: any
  variation?: string
}

export const PageBuilder = ({ data, variation }: PageBuilderProps) => {
  return (
    <>
      {data?.map((block: any) => {
        switch (block._type) {
          case 'richText':
            return <PortableTextBlock data={block} key={block._key} />
          case 'hero':
            return <Hero data={block} key={block._key} variation={variation} />
          case 'featuredCTA':
            return <FeaturedCTA data={block} key={block._key} />
          case 'carouselCTA':
            return <CarouselCTA data={block} key={block._key} />
          case 'twoColText':
            return <TwoColText data={block} key={block._key} />
          case 'twoImages':
            return <TwoImages data={block} key={block._key} />
          case 'imageCarousel':
            return <ImageCarousel data={block} key={block._key} />
          default:
            return null
        }
      })}
    </>
  )
}
