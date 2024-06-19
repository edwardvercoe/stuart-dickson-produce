import React from 'react'

import FeaturedCTA from '@/components/shared/FeaturedCTA'
import HomeHero from '@/components/shared/Hero/HomeHero'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'

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
          default:
            return null
        }
      })}
    </>
  )
}
