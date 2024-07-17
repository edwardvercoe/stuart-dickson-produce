import { PortableText } from '@portabletext/react'
import React from 'react'

import { cn } from '@/lib/utils'

import Components from './PortableTextComponents'

//TODO: Add types
type PortableTextBlockProps = {
  data: any
  className?: string
}

const PortableTextBlock = ({ data, className }: PortableTextBlockProps) => {
  if (!data) {
    return null
  }
  return (
    <div className={cn(className)}>
      <PortableText value={data} />
    </div>
  )
}

export default PortableTextBlock
