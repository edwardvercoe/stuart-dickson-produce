import Image from 'next/image'
import React from 'react'

import BrandArrowAccent from '@/assets/svg/brandArrowAccent.svg'
import SanityImg from '@/components/SanityComponents/SanityImg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import Button from '@/components/shared/Button'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
type HomeHeroProps = {
  data: any
}

const HomeHero = ({ data }: HomeHeroProps) => {
  const { title, subtitle, backgroundImage, buttons } = data
  return (
    <section className="full-bleed">
      <figure className="absolute top-0 left-0 w-full h-full  gradient-left">
        <SanityImg
          loading="eager"
          src={backgroundImage}
          className="w-full h-full object-cover object-center"
        />
      </figure>
      <div className="flex p-6 bg-auto bg-no-repeat bg-right items-center min-h-[800px] h-[100vh] relative">
        <div className="md:w-1/2 relative">
          <h1 className="h1 text-6xl font-extrabold leading-6xl text-left -mb-4 text-white">
            {title}
          </h1>
          <br />
          <PortableTextBlock className="text-white" data={subtitle} />
          {buttons && (
            <div className="flex gap-4 mt-4">
              {buttons.map((button, index) => (
                <SanityLink data={button} key={button._key}>
                  <Button
                    variant={index === 0 ? 'primary' : 'secondary'}
                    iconRight={
                      index === 0 && (
                        <Image
                          src={BrandArrowAccent}
                          alt="brand arrow icon"
                          height={16}
                          width={16}
                        />
                      )
                    }
                  >
                    {button.linkText}
                  </Button>
                </SanityLink>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default HomeHero
