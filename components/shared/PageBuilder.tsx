import React from 'react'

import HomeHero from './Hero/HomeHero'
import PortableTextBlock from './PortableText/PortableTextBlock'

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
          default:
            return null
        }
      })}
    </>
  )
}
