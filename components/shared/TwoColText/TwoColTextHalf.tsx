import React from 'react'
import { PortableText } from "@portabletext/react"
import type { TwoColText as TwoColTextType } from '@/types/sanity.types'

import Components from '../PortableText/PortableTextComponents'
import Container from '../Container'
import { cn } from '@/lib/utils'

type TwoColTextProps = {
  data: TwoColTextType
}

const TwoColTextHalf = ({ data }: TwoColTextProps) => {
  const { variation, leftColumn, rightColumn } = data

  return (
    <section className="py-10 md:py-20">
      <Container>
        <div className="flex gap-6 flex-col md:flex-row">
          <div className="w-full md:w-1/2 flex-col flex text-3xl">
            {leftColumn?.map((item, index) => (
              <div
                key={item._key}
                className={
                  index === 0
                    ? 'flex text-brand-darker-green'
                    : 'text-brand-gray'
                }
              >
                {index === 0 && (
                  <span className="hidden sm:block text-orange-500 mr-2 lg:mr-4 mt-1">
                    ||
                  </span>
                )}
                <div className="sm:pr-16 max-sm:text-xl">
                  <PortableText value={item} components={Components} />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/2">
            <div className="text-xl sm:text-2xl text-brand-gray pb-8">
              {rightColumn && (
                <PortableText value={rightColumn} components={Components} />
              )}
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}

export default TwoColTextHalf
