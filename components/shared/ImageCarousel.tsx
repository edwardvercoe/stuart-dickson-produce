'use client'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/navigation'

import React from 'react'
import { FreeMode, Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import SanityImg from '../SanityComponents/SanityImg'

const ImageCarousel = ({ data }: any) => {
  return (
    <section className="py-10 md:py-20 full-bleed">
      <div className="carousel__freeform">
        <Swiper
          modules={[FreeMode, Navigation]}
          navigation={false}
          freeMode={true}
          slidesPerView="auto"
          grabCursor={true}
          spaceBetween={36}
        >
          {data?.images.map((slide: any, index: number) => (
            <SwiperSlide key={slide._key} className="relative">
              <figure className="relative">
                <SanityImg
                  src={slide}
                  className="h-full object-cover object-center select-none "
                />
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  )
}

export default ImageCarousel
