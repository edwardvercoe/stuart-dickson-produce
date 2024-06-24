import React from 'react'

import SanityImg from '@/components/SanityComponents/SanityImg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import Button from '@/components/shared/Button'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
type FeaturedCTAProps = {
  data: any
}

const FeaturedCTA = ({ data }: FeaturedCTAProps) => {
  const { title, backgroundImage, buttons, description } = data
  return (
    <section className="full-bleed">
      <figure className="absolute top-0 left-0 w-full h-full">
        <SanityImg
          src={backgroundImage}
          className="w-full h-full object-cover object-center"
        />
      </figure>
      <div className="flex p-6 bg-cover bg-center items-center min-h-[600px] relative">
        <div className="md:w-1/2 text-white relative">
          <h1 className="text-6xl font-extrabold text-left">{title}</h1>
          <div>
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
