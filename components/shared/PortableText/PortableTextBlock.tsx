import { PortableText } from '@portabletext/react'
import React from 'react'

import Components from './PortableTextComponents'

//TODO: Add types
type PortableTextBlockProps = {
  data: any
}

const PortableTextBlock = ({ data }: PortableTextBlockProps) => {
  if (!data) {
    return null
  }
  return (
    <section>
      <div>
        <PortableText value={data} components={Components} />
      </div>
    </section>
  )
}

export default PortableTextBlock
