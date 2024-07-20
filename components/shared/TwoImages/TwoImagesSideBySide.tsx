import React from 'react'

import SanityImg from '../../SanityComponents/SanityImg'
import PortableTextBlock from '../PortableText/PortableTextBlock'

type TwoImagesProps = {
  data: any
}

const TwoImagesSideBySide = ({ data }: TwoImagesProps) => {
  const { imageLeft, imageRight, text } = data

  return (
    <section>
      <div className="flex my-8">
        <div className="w-full md:w-1/3 flex flex-col justify-end">
          <PortableTextBlock data={text} />
        </div>
        <div className="w-full md:w-2/3 flex flex-row gap-4">
          <SanityImg src={imageLeft} className="w-2/3 h-full object-cover" />
          <SanityImg src={imageRight} className="w-1/3 h-full object-cover" />
        </div>
      </div>
    </section>
  )
}

export default TwoImagesSideBySide
