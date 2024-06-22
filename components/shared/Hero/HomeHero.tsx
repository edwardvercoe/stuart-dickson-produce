import React from 'react'

import SanityImg from '@/components/SanityComponents/SanityImg'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import Button from '@/components/shared/Button'

type HomeHeroProps = {
  data: any
}

const HomeHero = ({ data }: HomeHeroProps) => {
  console.log(data)
  const { title, subtitle, backgroundImage, buttons } = data

  return (
    <div className='flex' style={{backgroundColor: '#EAE3DD'
    }}>
      <div className='flex-1 p-6'>
      <h1 className="h1 text-6xl font-extrabold leading-6xl text-left -mb-4">{title}</h1>
      <br />
      <PortableTextBlock data={subtitle} />
      {buttons && (
        <div className="flex gap-4 mt-4">
          {buttons.map((button, index) => (
            <a key={index} href={button.internalLink} className={index === 0 ? 'button' : 'button button--secondary'}>{button.linkText}</a>
          ))}
        </div>
      )}
      </div>
      <div className='flex-1'>
      <figure className="relative">
        <SanityImg
          src={backgroundImage}
          className="w-full h-full object-cover"
        />
      </figure>
      </div>
    </div>
  )
}

export default HomeHero
