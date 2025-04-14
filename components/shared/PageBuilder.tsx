import React from 'react'

import { OrderForm as OrderFormComponent } from '@/components/forms/OrderForm'
import CarouselCTA from '@/components/shared/CarouselCTA'
import FeaturedCTA from '@/components/shared/FeaturedCTA'
import Hero from '@/components/shared/Hero/Hero'
import type { Home, OrderForm, Page } from '@/types/sanity.types'

import GoogleMapBlock from './GoogleMapBlock'
import ImageCarousel from './ImageCarousel'
import TwoColText from './TwoColText/TwoColText'
import TwoImages from './TwoImages/TwoImages'

type PageBuilderProps = {
  data: NonNullable<Page['pageBuilder'] | Home['pageBuilder']>
  variation?: 'home'
}

export const PageBuilder = ({ data, variation }: PageBuilderProps) => {
  return (
    <>
      {data?.map((block) => {
        if (!block?._type) {
          console.warn('PageBuilder received a block without a _type:', block)
          return null
        }

        switch (block._type) {
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
          case 'googleMaps':
            return <GoogleMapBlock data={block} key={block._key} />
          case 'orderForm':
            return <OrderFormComponent {...(block as OrderForm)} key={block._key} />
          default:
            const unknownBlock = block as any;
            const blockType = unknownBlock?._type ?? 'unknown type';
            console.warn(`PageBuilder encountered an unhandled block type: ${blockType}`, block);
            return null
        }
      })}
    </>
  )
}
