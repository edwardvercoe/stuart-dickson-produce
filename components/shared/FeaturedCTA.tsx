import React from 'react'

import SanityImg from '@/components/SanityComponents/SanityImg'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'

type FeaturedCTAProps = {
  data: any
}

const FeaturedCTA = ({ data }: FeaturedCTAProps) => {
  const { title, description, backgroundImage, buttons } = data

  return (
    <div>
      Featured CTA component: FeaturedCTA.tsx
      <h1>title: {title}</h1>
      <br />
      <p>description:</p>
      <PortableTextBlock data={description} />
      <br />
      <p>backgroundImage:</p>
      <figure className="relative">
        <SanityImg
          src={backgroundImage}
          className="w-full h-full object-cover"
        />
      </figure>
    </div>
  )
}

export default FeaturedCTA
