import React from 'react'

import SanityImg from '../../SanityComponents/SanityImg'

type TwoImagesProps = {
  data: any
}

const TwoImagesSideBySide = ({ data }: TwoImagesProps) => {
  const { variation = 'apart', imageLeft, imageRight } = data

  return (
    <section>
      <div className="flex my-8">
        <div className="flex-[3_3_0%] flex flex-col justify-end">
          AVAILABLEFORCONTACT
          <br />
          agricultural@gmail.com
          {/* //PortableText goes here?? // */}
          <p>variation: {variation}</p>
        </div>
        <div className="flex-[7_7_0%] flex flex-row gap-4">
          <SanityImg src={imageLeft} className="w-2/3 h-full object-cover" />
          <SanityImg src={imageRight} className="w-1/3 h-full object-cover" />
        </div>
      </div>
    </section>
  )
}

export default TwoImagesSideBySide
