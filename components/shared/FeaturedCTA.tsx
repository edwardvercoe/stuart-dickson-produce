import { MapPin } from 'lucide-react'
import React from 'react'
import type { FeaturedCTA as FeaturedCTAType } from '@/types/sanity.types'

import SanityImg from '@/components/SanityComponents/SanityImg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import { buttonStyles } from '@/components/shared/Button'
import Container from '@/components/shared/Container'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import { cn } from '@/lib/utils'

type FeaturedCTAProps = {
  data: FeaturedCTAType
}

const FeaturedCTA = ({ data }: FeaturedCTAProps) => {
  const {
    title,
    subtitle,
    backgroundImage,
    buttons,
    description,
    foregroundImage,
    variation = 'left',
    caption,
  } = data
  return (
    <section className="relative">
      {/* Full-bleed background */}
      <figure
        className={cn(
          'absolute inset-0 gradient-left',
          variation === 'centered' && 'gradient-full',
        )}
      >
        {backgroundImage && (
          <SanityImg
            src={backgroundImage}
            className="w-full h-full object-cover object-center xl:object-top"
          />
        )}
      </figure>

      {/* Centered foreground image */}
      {foregroundImage && (
        <figure className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[20vw] h-[20vw] shadow-2xl">
          <SanityImg
            loading="eager"
            src={foregroundImage}
            className="w-full h-full object-cover object-center xl:object-top"
          />
        </figure>
      )}

      {/* Content */}
      <Container className="min-h-[600px] flex items-center">
        <div
          className={cn(
            'relative w-full flex',
            variation === 'centered' && 'justify-center'
          )}
        >
          <div
            className={cn(
              'max-w-[620px] text-white relative',
              variation === 'centered' &&
                'flex items-center justify-center flex-col text-center',
            )}
          >
            {subtitle && (
              <div className="pb-3">
                <h4 className="text-gray-200">{subtitle}</h4>
              </div>
            )}
            <div className="pb-6">
              <h2 className="text-2xl sm:text-3xl md:text-5xl font-medium">
                {title}
              </h2>
            </div>
            {description && (
              <div className="max-w-[520px]">
                <PortableTextBlock data={description} />
              </div>
            )}
            {buttons && (
              <div className="flex gap-4 mt-4">
                <div className="flex flex-col sm:flex-row gap-4 mt-4 w-full">
                  {buttons.map((button, index) => (
                    <SanityLink
                      key={button._key}
                      data={button}
                      className={buttonStyles({
                        variant: index === 0 ? 'primary' : 'secondary',
                        className: 'w-full sm:w-auto'
                      })}
                    >
                      <span className="font-medium">{button.linkText}</span>
                    </SanityLink>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </Container>
    </section>
  )
}

export default FeaturedCTA
