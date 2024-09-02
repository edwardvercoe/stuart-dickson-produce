'use client'
// Import Swiper styles
import 'swiper/css'

import { MapPin, MoveLeft, MoveRight } from 'lucide-react'
import React, { useRef, useState } from 'react'
import { Swiper as SwiperType } from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import { cn } from '@/lib/utils'

import SanityImg from '../SanityComponents/SanityImg'
import { InternalLinkWrapper } from '../SanityComponents/SanityLink'
import PortableTextBlock from './PortableText/PortableTextBlock'

type CarouselCTAProps = {
  data: any
}

const SlideWrapper = ({
  item,
  children,
}: {
  item: any
  children: React.ReactNode
}) => {
  if (item?.page?.slug) {
    return (
      <InternalLinkWrapper
        documentType={item?.page?._type}
        slug={item?.page?.slug}
      >
        {children}
      </InternalLinkWrapper>
    )
  } else {
    return <div className="relative">{children}</div>
  }
}

const CarouselCTA = ({ data }: CarouselCTAProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef<SwiperType>()
  const { carouselItems } = data
  return (
    <section className="full-bleed">
      <div className="relative">
        <Swiper
          autoplay={{
            delay: 6000,
            disableOnInteraction: true,
          }}
          grabCursor
          onBeforeInit={(swiper: SwiperType) => {
            swiperRef.current = swiper
          }}
          modules={[Navigation, Autoplay]}
          onSlideChange={(swiper: SwiperType) => {
            setCurrentSlide(swiper.activeIndex)
          }}
        >
          {carouselItems.map((item: any, index: number) => (
            <SwiperSlide key={item._key}>
              <SlideWrapper item={item}>
                <div className="bg-[#D8EDD9] min-h-[600px] relative flex flex-col ">
                  <figure
                    className={cn(
                      'absolute top-0 left-0 w-full h-full gradient-full',
                    )}
                  >
                    <SanityImg
                      src={item.backgroundImage}
                      className="w-full h-full object-cover object-center"
                    />
                  </figure>
                  <div className=" flex-grow relative max-w-[600px] bleed-padding-x py-20 text-white flex flex-col justify-between h-full gap-8">
                    <div>
                      <div>
                        {item?.subtitle && (
                          <div className="pb-3">
                            <h4 className="text-gray-200">{item?.subtitle}</h4>
                          </div>
                        )}
                        <div>
                          <h2 className="h2 ">{item.title}</h2>
                        </div>
                        {item?.description && (
                          <div className="max-w-[520px] pt-8">
                            <PortableTextBlock data={item?.description} />
                          </div>
                        )}
                      </div>
                    </div>

                    <div className="flex flex-row gap-4">
                      <MapPin stroke="white" strokeWidth={1} />
                      <p>{item.caption}</p>
                    </div>
                  </div>
                </div>
              </SlideWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
        {carouselItems.length > 1 && (
          <div
            data-navigation
            className="absolute right-[15%] bottom-16 flex flex-row items-center justify-center gap-4"
          >
            <button
              className="size-16 flex items-center justify-center"
              type="button"
              onClick={() => swiperRef.current?.slidePrev()}
            >
              <MoveLeft size={40} color="white" className="relative z-10" />
            </button>
            <div className="size-32 bg-brand-orange text-white rounded-full flex items-center justify-center navigation-ball relative z-10">
              <div className="relative">
                <span>{currentSlide + 1}</span>
                <span>/</span>
                <span>{carouselItems.length}</span>
              </div>
            </div>
            <button
              className="size-16 flex items-center justify-center"
              type="button"
              onClick={() => swiperRef.current?.slideNext()}
            >
              <MoveRight size={40} color="white" className="relative z-10" />
            </button>
          </div>
        )}
      </div>
    </section>
  )
}

export default CarouselCTA
