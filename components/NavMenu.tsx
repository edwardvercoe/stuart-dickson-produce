'use client'
import { motion, Variants } from 'framer-motion'
import Link from 'next/link'
import { PortableText } from 'next-sanity'
import React from 'react'

import SanityLink from '@/components/SanityComponents/SanityLink'
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTrigger,
} from '@/components/ui/sheet'
import { cn } from '@/lib/utils'
import type { SettingsPayload } from '@/types'

type NavMenuProps = {
  navData: SettingsPayload
  isMenuOpen: boolean
  setIsMenuOpen: (value: boolean | ((prevState: boolean) => boolean)) => void
}

const linkVariants: Variants = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
}

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="white"
    strokeLinecap="round"
    {...props}
  />
)

const MenuToggle = ({ isOpen }: { isOpen: boolean }) => (
  <svg width="24" height="24" viewBox="0 0 24 24">
    <Path
      variants={{
        closed: { d: "M 4 7 L 20 7" },
        open: { d: "M 5 5 L 19 19" }
      }}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
    />
    <Path
      variants={{
        closed: { d: "M 4 17 L 20 17", opacity: 1 },
        open: { d: "M 19 5 L 5 19", opacity: 1 }
      }}
      animate={isOpen ? "open" : "closed"}
      transition={{ duration: 0.3 }}
    />
  </svg>
)

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
          className={cn(
            'flex items-center justify-center w-12 h-12 rounded-full bg-brand-black/60 backdrop-blur-sm transition-all hover:bg-brand-black',
            isMenuOpen ? 'bg-brand-black' : ''
          )}
          aria-label="Toggle menu"
        >
          <MenuToggle isOpen={isMenuOpen} />
        </button>
      </SheetTrigger>
      <SheetContent className="z-[99] bg-brand-black text-white border-none min-h-screen flex flex-col">
        <SheetHeader>
          <div className="pt-32">
            <ul className="list-none p-0 text-left text-2xl flex flex-col gap-8">
              <motion.div
                initial="initial"
                variants={linkVariants}
                transition={{ delay: 0.2 }}
                whileInView="animate"
              >
                <li>
                  <Link
                    href="/"
                    onClick={() => setIsMenuOpen(false)}
                    className="hover:text-brand-orange transition-colors"
                  >
                    <span>HOME</span>
                  </Link>
                </li>
              </motion.div>
              {navData?.menuItems?.map((link, index) => (
                <motion.div
                  key={`menu-item-${index}`}
                  initial="initial"
                  variants={linkVariants}
                  transition={{ delay: 0.3 + index * 0.1 }}
                  whileInView="animate"
                >
                  <li onClick={() => setIsMenuOpen(false)}>
                    <SanityLink 
                      data={link}
                      className="hover:text-brand-orange transition-colors"
                    >
                      <span>{link?.linkText || ''}</span>
                    </SanityLink>
                  </li>
                </motion.div>
              ))}
            </ul>
          </div>
        </SheetHeader>
        {navData?.contactDetails && (
          <div className="text-left mt-auto pb-8 contact-details overflow-y-auto max-h-[30vh]">
            <div className="prose prose-invert prose-sm max-w-none">
              <PortableText value={navData.contactDetails} />
            </div>
          </div>
        )}
      </SheetContent>
    </Sheet>
  )
}

export default NavMenu
