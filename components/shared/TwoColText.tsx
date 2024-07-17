import React from 'react'

import PortableTextBlock from './PortableText/PortableTextBlock'

type TwoColTextProps = {
  data: any
}

const TwoColText = ({ data }: TwoColTextProps) => {
  const { variation, leftColumn, rightColumn } = data
  return (
    <section>
      <div className="border border-green-400 border-4 border-dotted">
        <p>Variation: {variation}</p>

        <div>
          <div>
            <p>Left Column:</p>
            <PortableTextBlock data={leftColumn} />
          </div>

          <div>
            <p>Right Column:</p>
            <PortableTextBlock data={rightColumn} />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TwoColText
