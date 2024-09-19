'use client'
import { motion, Variants } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import React from 'react'

import BrandArrowAccent from '@/assets/svg/brand-arrow-white.svg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'

type NavMenuProps = {
  navData: any
  isMenuOpen: boolean
  setIsMenuOpen: any
}
const linkVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

export const NavMenu = ({
  navData,
  isMenuOpen,
  setIsMenuOpen,
}: NavMenuProps) => {
  return (
    <Sheet open={isMenuOpen} modal={false}>
      <SheetTrigger asChild>
        <button
          onClick={() => setIsMenuOpen((prevState) => !prevState)}
          className={cn('transition', isMenuOpen ? '-rotate-90' : 'rotate-0')}
        >
          <Image
            className="ml-auto block md:hidden z-[9999] relative cursor-pointer pointer-events-none"
            alt="Brand Arrow Accent"
            src={BrandArrowAccent}
            width={32}
            height={32}
          />
        </button>
      </SheetTrigger>
      <SheetContent className="z-[99] bg-brand-black text-white border-none min-h-screen flex flex-col">
        <SheetHeader>
          <div className="pt-24">
            <ul className="list-none p-0 text-left text-2xl flex flex-col gap-8">
              <li>
                <Link href="/">
                  <span>HOME</span>
                </Link>
              </li>
              {navData?.menuItems ? (
                navData?.menuItems?.map((link: any, index: number) => (
                  <motion.li
                    key={link._key}
                    initial="initial"
                    variants={linkVariants}
                    transition={{ delay: 0.3 + index * 0.1 }}
                    whileInView="animate"
                  >
                    <SanityLink data={link}>
                      <span>{link?.linkText || ''}</span>
                    </SanityLink>
                  </motion.li>
                ))
              ) : (
                <span></span>
              )}
            </ul>
          </div>
        </SheetHeader>
        {navData?.contactDetails && (
          <div className="text-left mt-auto contact-details">
            <PortableText value={navData?.contactDetails} />
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default NavMenu
