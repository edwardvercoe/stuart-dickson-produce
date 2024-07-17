import React from 'react'

import SanityImg from '@/components/SanityComponents/SanityImg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import Button from '@/components/shared/Button'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
type FeaturedCTAProps = {
  data: any
}

const FeaturedCTA = ({ data }: FeaturedCTAProps) => {
  const {
    title,
    backgroundImage,
    buttons,
    description,
    foregroundImage,
    variation = 'left',
  } = data
  return (
    <section className="full-bleed">
      <figure className="absolute top-0 left-0 w-full h-full gradient-left">
        <SanityImg
          src={backgroundImage}
          className="w-full h-full object-cover object-center"
        />
      </figure>
      {foregroundImage && (
        <figure className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] shadow-2xl">
          <SanityImg
            loading="eager"
            src={foregroundImage}
            className="w-full h-full object-cover object-center"
          />
        </figure>
      )}
      <div className="flex p-6 bg-cover bg-center items-center min-h-[600px] relative">
        <div className="md:w-1/2 text-white relative">
          <div className="pb-6">
            <h1 className="text-6xl font-extrabold text-left">{title}</h1>
          </div>
          <div className="max-w-[520px]">
            <PortableTextBlock data={description} />
          </div>
          {buttons && (
            <div className="flex gap-4 mt-4">
              {buttons && (
                <div className="flex gap-4 mt-4">
                  {buttons.map((button, index) => (
                    <SanityLink data={button} key={button._key}>
                      <Button variant={index === 0 ? 'primary' : 'secondary'}>
                        {button.linkText}
                      </Button>
                    </SanityLink>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default FeaturedCTA
