import React from 'react'
import PortableTextBlock from '../PortableText/PortableTextBlock'
import SanityImg from '@/components/SanityComponents/SanityImg'

type TwoImagesProps = {
  data: any
}

const TwoImagesApart = ({ data }: TwoImagesProps) => {
  const { imageLeft, imageRight, text } = data
  return (
    <section>
      <div className='flex flex-row'>
      <div className='flex flex-col w-1/2'>
      {text.map((item, index) => (
    <div
      key={index}
      className={
        index === 0
          ? 'flex text-brand-darker-green text-2xl font-bold py-8'
          : 'text-brand-gray'
      }
    >
      {index === 0 && <span className="text-orange-500 mr-2">||</span>}
      <PortableTextBlock data={text} />
    </div>
  ))}
  <SanityImg src={imageLeft} className="w-1/2 h-full object-cover" />
           </div>
                <div className='w-1/2 flex justify-end'>
        <SanityImg src={imageRight} className="w-3/4 h-4/5 object-cover" />           
        </div>
  </div>
    </section>
  )
}

export default TwoImagesApart
