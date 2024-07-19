import React from 'react'

import PortableTextBlock from './PortableText/PortableTextBlock'

type TwoColTextProps = {
  data: any
}

const TwoColText = ({ data }) => {
  console.log(data)
  const { variation, leftColumn, rightColumn } = data;
  return (
    <section>
      <div>
        <div className='flex'>
          <div className='flex-[3_3_0%] flex-row flex'>
          <span className='text-orange-500 text-lg'>||</span><PortableTextBlock data={leftColumn} className='pl-2 text-lg text-brand-darker-green font-bold leading-7 text-left' />
          </div>
          <div className='flex-[7_7_0%]'>
          {rightColumn.map((item, index) => (
              <div key={index} className={index === 0 ? 'text-5xl text-brand-darker-green pb-8' : 'text-brand-gray'}>
                <PortableTextBlock data={item} />
              </div>
            ))}
                      </div>
        </div>
      </div>
    </section>
  );
}


export default TwoColText
