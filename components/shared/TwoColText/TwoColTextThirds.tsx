import React from 'react'

import PortableTextBlock from '../PortableText/PortableTextBlock'

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
            <PortableTextBlock
              data={leftColumn}
              className="pl-2 text-3xl lg:text-4xl text-brand-darker-green  leading-7 text-left"
            />
          </div>
          <div className="w-fulll md:w-2/3">
            {rightColumn.map((item, index) => (
              <div key={index} className="text-brand-gray">
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
