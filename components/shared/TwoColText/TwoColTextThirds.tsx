import React from 'react'
import { PortableText } from "@portabletext/react"
import Components from '../PortableText/PortableTextComponents'
import { cn } from '@/lib/utils'

type TwoColTextProps = {
  data: any
}

const TwoColTextThirds = ({ data }: TwoColTextProps) => {
  const { leftColumn, rightColumn } = data
  return (
    <section className="py-10 md:py-20">
      <div>
        <div className="flex lg:gap-10 gap-6 flex-col md:flex-row ">
          <div className="w-full md:w-1/3 flex-row flex ">
            <span className="hidden sm:block text-orange-500 mt-1 text-lg">
              ||
            </span>
            <div className="pl-2 text-3xl lg:text-4xl text-brand-darker-green leading-7 text-left">
              <PortableText value={leftColumn} components={Components} />
            </div>
          </div>
          <div className="w-fulll md:w-2/3">
            {rightColumn.map((item, index) => (
              <div key={index} className="text-brand-gray">
                <PortableText value={item} components={Components} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TwoColTextThirds
