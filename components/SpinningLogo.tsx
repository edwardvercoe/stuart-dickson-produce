'use client'
import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import React from 'react'

import crestNumberless from '@/assets/img/crest-numberless.png'

const SpinningLogo = () => {
  const { scrollYProgress } = useScroll()
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  const rotate = useTransform(smoothProgress, [0, 1], [0, 360])

  return (
    <div className="relative origin-center w-[90px] h-[90px]">
      <motion.div
        style={{
          rotate,
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <Image
          src={crestNumberless}
          alt="logo"
          width={90}
          height={90}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center rounded-full bg-black/20"
        />
      </motion.div>
    </div>
  )
}

export default SpinningLogo
