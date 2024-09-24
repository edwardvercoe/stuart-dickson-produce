import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import BrandArrowAccent from '@/assets/svg/brand-arrow-accent.svg'
import MouseSVG from '@/assets/svg/mouse.svg'
import SanityImg from '@/components/SanityComponents/SanityImg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import Button from '@/components/shared/Button'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import { cn } from '@/lib/utils'
type HeroProps = {
  data: any
  variation?: string
}

const Hero = ({ data, variation }: HeroProps) => {
  const {
    title,
    subtitle,
    backgroundImage,
    buttons,
    foregroundImage,
    caption,
  } = data

  return (
    <>
      <section className="full-bleed">
        <figure className="absolute top-0 left-0 w-full h-full  gradient-left overflow-hidden">
          <SanityImg
            loading="eager"
            src={backgroundImage}
            className="w-full h-full object-cover object-center scale-down-animation"
          />
          {variation === 'home' && (
            <Image
              src={MouseSVG}
              alt="mouse icon"
              width="22"
              height="32"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scrollDown"
            />
          )}
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
        <div
          className={cn(
            'flex flex-col pb-4 md:p-6 justify-center items-center min-h-[600px] relative bleed-padding-x',
            variation === 'home' && 'min-h-[800px] h-[100vh]',
          )}
        >
          <div className="flex-1 w-full relative flex flex-col justify-center">
            <div>
              <h1
                className={cn(
                  'h1 text-2xl font-normal leading-6xl text-left text-gray-300 pb-4 lg:pb-8',
                  variation === 'home' &&
                    ' text-2xl font-normal text-gray-300 pb-4',
                )}
              >
                {title}
              </h1>
            </div>
            {subtitle && (
              <PortableTextBlock
                className={cn(
                  'text-white pb-8  sm:text-3xl lg:text-5xl max-w-[800px] leading-[1.15]',
                  variation === 'home' &&
                    'text-2xl sm:text-3xl lg:text-5xl max-w-[800px] leading-[1.15]',
                )}
                data={subtitle}
              />
            )}

            {buttons && (
              <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                {buttons.map((button, index) => (
                  <SanityLink data={button} key={button._key}>
                    <Button
                      className="w-full sm:w-auto"
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
          {caption && (
            <div className="flex flex-row gap-4 w-full">
              <MapPin stroke="white" strokeWidth={1} />
              <p className="text-white">{caption}</p>
            </div>
          )}
        </div>
      </section>
      <section className="full-bleed h-4 flex flex-row relative w-full">
        <div className="bg-brand-mahogany flex-1" />
        <div className="bg-brand-orange flex-1" />
        <div className="bg-accent flex-1" />
      </section>
    </>
  )
}

export default Hero
