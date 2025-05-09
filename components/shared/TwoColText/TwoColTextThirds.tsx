import { PortableText } from '@portabletext/react'
import React from 'react'

import { cn } from '@/lib/utils'
import type { TwoColText as TwoColTextType } from '@/types/sanity.types'

import Components from '../PortableText/PortableTextComponents'

type TwoColTextProps = {
  data: TwoColTextType
}

const TwoColTextThirds = ({ data }: TwoColTextProps) => {
  const { variation, leftColumn, rightColumn } = data

  return (
    <section className="py-10 md:py-20">
      <div>
        <div className="flex gap-6 flex-col md:flex-row ">
          <div className="w-full md:w-1/3 flex-col flex text-3xl">
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
                  <span className="hidden sm:block text-orange-500  mr-2 lg:mr-4 mt-1">
                    ||
                  </span>
                )}
                <div className="sm:pr-16 max-sm:text-xl">
                  <PortableText value={item} components={Components} />
                </div>
              </div>
            ))}
          </div>

          <div className="w-full md:w-2/3">
            <div className="text-xl sm:text-2xl text-brand-gray pb-8">
              {rightColumn && (
                <PortableText value={rightColumn} components={Components} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default TwoColTextThirds
