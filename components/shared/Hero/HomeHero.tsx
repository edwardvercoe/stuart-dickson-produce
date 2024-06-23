import React from 'react';
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock';
import imageUrlBuilder from '@sanity/image-url';
import { client } from '@/sanity/lib/client';

const builder = imageUrlBuilder(client);

function urlFor(source) {
  return builder.image(source);
}

type HomeHeroProps = {
  data: any;
};

const HomeHero = ({ data }: HomeHeroProps) => {
  const { title, subtitle, backgroundImage, buttons } = data;

  return (
    <div 
      className="flex p-6 bg-auto bg-no-repeat bg-right items-center" 
      style={{
        minHeight: '600px',
        backgroundColor: '#EAE3DD',
        backgroundImage: `url(${urlFor(backgroundImage.asset._ref)})`
      }}
    >
      <div className='md:w-1/2'>
        <h1 className="h1 text-6xl font-extrabold leading-6xl text-left -mb-4">{title}</h1>
        <br />
        <PortableTextBlock data={subtitle} />
        {buttons && (
          <div className="flex gap-4 mt-4">
            {buttons.map((button, index) => (
              <a 
                key={index}
                href={button.internalLink} 
                className={`px-4 py-2 cursor-pointer shadow-md ${index === 0 ? 'bg-custom-orange text-white' : 'bg-none text-black border border-custom-orange'}`}
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

export default HomeHero;
