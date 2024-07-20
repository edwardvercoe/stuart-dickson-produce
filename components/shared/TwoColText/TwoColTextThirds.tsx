import React from 'react'

import PortableTextBlock from '../PortableText/PortableTextBlock'

type TwoColTextProps = {
  data: any
}

const TwoColTextThirds = ({ data }: TwoColTextProps) => {
  const { leftColumn, rightColumn } = data
  return (
    <section className="py-10">
      <div>
        <div className="flex flex-col md:flex-row ">
          <div className="w-full md:w-1/3 flex-row flex">
            <span className="text-orange-500 text-lg">||</span>
            <PortableTextBlock
              data={leftColumn}
              className="pl-2 text-lg text-brand-darker-green font-bold leading-7 text-left"
            />
          </div>
          <div className="w-fulll md:w-2/3">
            {rightColumn.map((item, index) => (
              <div
                key={index}
                className={
                  index === 0
                    ? 'text-3xl lg:text-5xl text-brand-darker-green pb-8'
                    : 'text-brand-gray'
                }
              >
                <PortableTextBlock data={item} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default TwoColTextThirds
