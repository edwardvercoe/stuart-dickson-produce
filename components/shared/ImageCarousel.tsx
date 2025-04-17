'use client'

import 'swiper/css'
import 'swiper/css/free-mode'
import 'swiper/css/pagination'
import 'swiper/css/autoplay'

import React from 'react'
import { A11y,Autoplay, Pagination } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'

import SanityImg from '../SanityComponents/SanityImg'

const ImageCarousel = ({ data }: any) => {
  return (
    <section className="py-10 md:py-20 full-bleed">
      <div className="carousel__freeform relative">
        <Swiper
          modules={[Pagination, A11y, Autoplay]}
          spaceBetween={0}
          slidesPerView={1.2}
          centeredSlides={true}
          initialSlide={1}
          loop={true}
          autoplay={{
            delay: 6000,
            pauseOnMouseEnter: true,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            el: '.swiper-pagination',
          }}
          speed={400}
          simulateTouch={true}
          touchRatio={1}
          shortSwipes={false}
          longSwipesRatio={0.2}
          resistance={true}
          resistanceRatio={0.85}
          className="carousel__freeform"
          breakpoints={{
            640: {
              slidesPerView: 1.6,
            },
            1024: {
              slidesPerView: 1.8,
            },
          }}
        >
          {data?.images.map((slide: any, index: number) => (
            <SwiperSlide key={slide._key} className="relative">
              <figure className="relative overflow-hidden">
                <SanityImg
                  src={slide}
                  className="h-full w-full object-cover object-center select-none"
                />
                <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/50"></div>
              </figure>
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Pagination */}
        <div className="swiper-pagination relative mt-8"></div>
      </div>
    </section>
  )
}

export default ImageCarousel
