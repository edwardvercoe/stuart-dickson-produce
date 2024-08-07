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
    <motion.div
      style={{
        rotate,
      }}
      className="relative origin-center w-[70px] h-[70px]"
    >
      <Image
        src={crestNumberless}
        alt="logo"
        width={70}
        height={70}
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 origin-center invert"
      />
    </motion.div>
  )
}

export default SpinningLogo
