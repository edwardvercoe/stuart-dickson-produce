import React from 'react'

import CarouselCTA from '@/components/shared/CarouselCTA'
import FeaturedCTA from '@/components/shared/FeaturedCTA'
import HomeHero from '@/components/shared/Hero/HomeHero'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'

import TwoColText from './TwoColText/TwoColText'
import TwoImages from './TwoImages/TwoImages'

type PageBuilderProps = {
  data: any
}

export const PageBuilder = ({ data }: PageBuilderProps) => {
  return (
    <>
      {data?.map((block: any) => {
        switch (block._type) {
          case 'richText':
            return <PortableTextBlock data={block} key={block._key} />
          case 'hero':
            return <HomeHero data={block} key={block._key} />
          case 'featuredCTA':
            return <FeaturedCTA data={block} key={block._key} />
          case 'carouselCTA':
            return <CarouselCTA data={block} key={block._key} />
          case 'twoColText':
            return <TwoColText data={block} key={block._key} />
          case 'twoImages':
            return <TwoImages data={block} key={block._key} />
          default:
            return null
        }
      })}
    </>
  )
}
