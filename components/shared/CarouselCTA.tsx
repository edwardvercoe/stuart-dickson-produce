'use client'
// Import Swiper styles
import 'swiper/css'

import { MapPin, MoveLeft, MoveRight } from 'lucide-react'
import React, { useRef, useState } from 'react'
import type { Swiper as SwiperType } from 'swiper'
import { Autoplay, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import type { CarouselCTA as CarouselCTAType, CarouselItem } from '@/types/sanity.types'

import { cn } from '@/lib/utils'

import SanityImg from '../SanityComponents/SanityImg'
import SanityLink from '../SanityComponents/SanityLink'
import { buttonStyles } from './Button'
import Container from './Container'
import PortableTextBlock from './PortableText/PortableTextBlock'

type CarouselCTAProps = {
  data: CarouselCTAType
}

const SlideWrapper = ({
  item,
  children,
}: {
  item: CarouselItem
  children: React.ReactNode
}) => {
  return <div className="relative w-full">{children}</div>
}

const CarouselCTA = ({ data }: CarouselCTAProps) => {
  const [currentSlide, setCurrentSlide] = useState(0)
  const swiperRef = useRef<SwiperType | null>(null)
  const { carouselItems } = data

  return (
    <section className="full-bleed">
      <div className="w-full">
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
          className="w-full"
        >
          {carouselItems?.map((item, index) => (
            <SwiperSlide key={item._key} className="w-full">
              <SlideWrapper item={item}>
                <div className="bg-[#D8EDD9] min-h-[600px] relative w-full">
                  <figure className="absolute inset-0 w-full h-full gradient-full">
                    {item.backgroundImage && (
                      <SanityImg
                        src={item.backgroundImage}
                        className="w-full h-full object-cover object-center"
                      />
                    )}
                  </figure>
                  <Container className="relative h-full">
                    <div className="flex flex-col justify-between h-full py-20 gap-8">
                      <div className="max-w-[600px] text-white">
                        <div>
                          {item.subtitle && (
                            <div className="pb-3">
                              <h4 className="text-gray-200">{item.subtitle}</h4>
                            </div>
                          )}
                          <div>
                            <h2 className="h2">{item.title}</h2>
                          </div>
                          {item.description && (
                            <div className="max-w-[520px] pt-8">
                              <PortableTextBlock data={item.description} />
                            </div>
                          )}
                          {item.buttons && (
                            <div className="flex gap-4 mt-4">
                              {item.buttons.map((button, index) => (
                                <SanityLink
                                  key={button._key}
                                  data={button}
                                  className={buttonStyles({
                                    variant: index === 0 ? 'primary' : 'secondary',
                                    className: 'w-full sm:w-auto'
                                  })}
                                >
                                  <span className="font-medium">{button.linkText}</span>
                                </SanityLink>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {item.caption && (
                        <div className="flex flex-row gap-4 text-white">
                          <MapPin stroke="white" strokeWidth={1} />
                          <p>{item.caption}</p>
                        </div>
                      )}
                    </div>
                  </Container>
                </div>
              </SlideWrapper>
            </SwiperSlide>
          ))}
        </Swiper>
        {carouselItems && carouselItems.length > 1 && (
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
