import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

import Components from './PortableText/PortableTextComponents'

interface CustomPortableTextProps {
  value: PortableTextBlock | PortableTextBlock[]
  className?: string
}

export default function CustomPortableText({
  value,
  className,
}: CustomPortableTextProps) {
  if (!value) {
    return null
  }

  return (
    <div className={className}>
      <PortableText value={value} components={Components} />
    </div>
  )
}
