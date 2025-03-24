import { MapPin } from 'lucide-react'
import Image from 'next/image'
import React from 'react'

import BrandArrowAccent from '@/assets/svg/brand-arrow-accent.svg'
import MouseSVG from '@/assets/svg/mouse.svg'
import SanityImg from '@/components/SanityComponents/SanityImg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import { buttonStyles } from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import { cn } from '@/lib/utils'
import type { Hero as HeroType } from '@/types/sanity.types'

type HeroProps = {
  data: HeroType
  variation?: 'home'
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
      <section
        className={cn(
          'relative overflow-hidden',
          variation === 'home' ? 'h-svh' : 'h-[600px]',
        )}
      >
        <div className="absolute inset-0 gradient-left">
          {backgroundImage && (
            <SanityImg
              loading="eager"
              src={backgroundImage}
              className="w-full h-full object-cover object-center xl:object-top scale-down-animation"
            />
          )}
          {variation === 'home' && (
            <Image
              src={MouseSVG}
              alt="mouse icon"
              width="22"
              height="32"
              className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 animate-scrollDown"
            />
          )}
        </div>
        {foregroundImage && (
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] shadow-2xl">
            <SanityImg
              loading="eager"
              src={foregroundImage}
              className="w-full h-full object-cover object-center xl:object-top"
            />
          </div>
        )}
        <Container className="h-full">
          <div className="flex flex-col pb-4 md:p-0 justify-center items-start relative h-full pt-14 md:pt-0">
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
                    'text-white pb-8 text-2xl sm:text-3xl lg:text-5xl max-w-[800px] leading-[1.15]',
                    variation === 'home' &&
                      'text-2xl sm:text-3xl lg:text-5xl max-w-[800px] leading-[1.15]',
                  )}
                  data={subtitle}
                />
              )}

              {buttons && (
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                  {buttons.map((button, index) => {
                    const hasIcon = index === 0
                    return (
                      <SanityLink
                        key={button._key}
                        data={button}
                        className={buttonStyles({
                          variant: index === 0 ? 'primary' : 'secondary',
                          iconRight: hasIcon,
                          className: 'w-full sm:w-auto',
                        })}
                      >
                        <span className="font-medium">{button.linkText}</span>
                        {hasIcon && (
                          <span className="ml-4 flex items-center justify-center bg-brand-black rounded-full size-10">
                            <Image
                              src={BrandArrowAccent}
                              alt="brand arrow icon"
                              height={16}
                              width={16}
                            />
                          </span>
                        )}
                      </SanityLink>
                    )
                  })}
                </div>
              )}
            </div>
            {caption && (
              <div className="flex flex-row gap-4 w-full pb-12 md:pb-6">
                <MapPin stroke="white" strokeWidth={1} />
                <p className="text-white">{caption}</p>
              </div>
            )}
          </div>
        </Container>
      </section>
      <section className="full-bleed h-4 flex flex-row">
        <div className="bg-brand-mahogany flex-1" />
        <div className="bg-brand-orange flex-1" />
        <div className="bg-accent flex-1" />
      </section>
    </>
  )
}

export default Hero
