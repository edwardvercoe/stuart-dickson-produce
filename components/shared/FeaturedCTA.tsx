import { MapPin } from 'lucide-react'
import React from 'react'

import SanityImg from '@/components/SanityComponents/SanityImg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import Button from '@/components/shared/Button'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import { cn } from '@/lib/utils'
type FeaturedCTAProps = {
  data: any
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
    <section className="full-bleed">
      <figure
        className={cn(
          'absolute top-0 left-0 w-full h-full gradient-left',
          variation === 'centered' && 'gradient-full',
        )}
      >
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
      <div
        className={cn(
          'flex p-6 bg-cover bg-center items-center min-h-[600px] relative bleed-padding-x',
          variation === 'centered' && 'justify-center text-center',
        )}
      >
        <div
          className={cn(
            'max-w-[620px] text-white relative',
            variation === 'centered' &&
              'flex items-center justify-center flex-col',
          )}
        >
          {subtitle && (
            <div className="pb-3">
              <h4 className="text-gray-200">{subtitle}</h4>
            </div>
          )}
          <div className="pb-6">
            <h2 className="text-5xl font-medium">{title}</h2>
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
