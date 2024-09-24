import React from 'react'

import PortableTextBlock from '../PortableText/PortableTextBlock'

type TwoColTextProps = {
  data: any
}

const TwoColTextHalf = ({ data }: TwoColTextProps) => {
  const { variation, leftColumn, rightColumn } = data

  return (
    <section className="py-10 md:py-20">
      <div>
        <div className="flex gap-6 flex-col md:flex-row ">
          <div className="w-full md:w-1/2 flex-col flex text-3xl">
            {leftColumn.map((item, index) => (
              <div
                key={index}
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
                <PortableTextBlock
                  data={item}
                  className="sm:pr-16 max-sm:text-xl"
                />
              </div>
            ))}
          </div>

          <div className="w-full md:w-1/2">
            <PortableTextBlock
              data={rightColumn}
              className="text-xl sm:text-2xl text-brand-gray pb-8"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

export default TwoColTextHalf
