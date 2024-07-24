import Image from 'next/image'
import React from 'react'

import BrandArrowAccent from '@/assets/svg/brandArrowAccent.svg'
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
  const { title, subtitle, backgroundImage, buttons, foregroundImage } = data

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
            'flex pb-4 md:p-6 items-center min-h-[600px] relative bleed-padding-x',
            variation === 'home' && 'min-h-[800px] h-[100vh]',
          )}
        >
          <div className="w-full max-w-[560px] relative">
            <div className="pb-8">
              <h1 className="h1 text-6xl font-extrabold leading-6xl text-left -mb-4 text-white">
                {title}
              </h1>
            </div>

            <PortableTextBlock
              className="text-white pb-8 max-w-[520px]"
              data={subtitle}
            />
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
      <section className="full-bleed h-4 flex flex-row relative w-full">
        <div className="bg-[#17601A] flex-1" />
        <div className="bg-[#17601A]/60 flex-1" />
        <div className="bg-[#D8EDD9] flex-1" />
      </section>
    </>
  )
}

export default Hero
