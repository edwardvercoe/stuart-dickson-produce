import React from 'react'

import SanityImg from '../SanityComponents/SanityImg'

type TwoImagesProps = {
  data: any
}

const TwoImages = ({ data }: TwoImagesProps) => {
  const { variation = 'apart', imageLeft, imageRight } = data

  return (
    <section>
      {/* you can remove the border when you're done - its just for testing */}
      <div className="border border-red-400 border-4 border-dotted">
        <p>variation: {variation}</p>

        <p>image left:</p>
        <SanityImg src={imageLeft} />

        <p>image right:</p>
        <SanityImg src={imageRight} />
      </div>
    </section>
  )
}

export default TwoImages
