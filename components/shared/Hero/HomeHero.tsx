import React from 'react'

import SanityImg from '@/components/SanityComponents/SanityImg'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'

type HomeHeroProps = {
  data: any
}

const HomeHero = ({ data }: HomeHeroProps) => {
  console.log(data)
  const { title, subtitle, backgroundImage, buttons } = data

  return (
    <div>
      HomeHero component: HomeHero.tsx
      <h1>title: {title}</h1>
      <br />
      <p>subtitle:</p>
      <PortableTextBlock data={subtitle} />
      <br />
      <p>image:</p>
      <figure className="relative">
        <SanityImg
          src={backgroundImage}
          className="w-full h-full object-cover"
        />
      </figure>
    </div>
  )
}

export default HomeHero
