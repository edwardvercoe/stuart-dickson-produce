import React from 'react'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);
  
function urlFor(source) {
  return builder.image(source);
}

type FeaturedCTAProps = {
  data: any
}


const FeaturedCTA = ({ data }: FeaturedCTAProps) => {
  console.log(data);

  const { title, backgroundImage, buttons, description } = data;  
    return (
      <div 
        className="flex p-6 bg-cover bg-center items-center bg-white" 
        style={{
          minHeight: '600px',
          backgroundImage: `url(${urlFor(backgroundImage.asset._ref)})`
        }}
      >
        <div className='md:w-1/2  text-white '>
          <h1 className="h1 text-6xl font-extrabold leading-6xl text-left -mb-4">{title}</h1>
          <br />
          <PortableTextBlock data={description} />
          {buttons && (
            <div className="flex gap-4 mt-4">
              {buttons.map((button, index) => (
                <a 
                  key={index}
                  href={button.internalLink} 
                  className={`px-4 py-2 cursor-pointer shadow-md bg-white text-black border border-black'}`}
                >
                  {button.linkText}
                </a>
              ))}
            </div>
          )}
        </div>
      </div>
    );
  };
    
export default FeaturedCTA
