import React from 'react'

import SanityImg from '@/components/SanityComponents/SanityImg'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'

type TwoImagesProps = {
  data: any
}

const TwoImagesApart = ({ data }: TwoImagesProps) => {
  const { imageLeft, imageRight, text } = data
  return (
    <section className="py-10 md:py-20">
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex flex-col w-full md:w-1/2">
          <div className="pb-10">
            {text.map((item, index) => (
              <div
                key={index}
                className={
                  index === 0
                    ? 'flex text-brand-darker-green'
                    : 'text-brand-gray'
                }
              >
                {index === 0 && (
                  <span className="text-orange-500 mr-2 mt-1">||</span>
                )}
                <PortableTextBlock data={text} />
              </div>
            ))}
          </div>

          <SanityImg
            src={imageLeft}
            className="w-full md:w-1/2 h-full object-cover"
          />
        </div>
        <div className="w-full md:w-1/2 justify-end">
          <SanityImg
            src={imageRight}
            className="w-full md:w-3/4 h-4/5 object-cover"
          />
        </div>
      </div>
    </section>
  )
}

export default TwoImagesApart
