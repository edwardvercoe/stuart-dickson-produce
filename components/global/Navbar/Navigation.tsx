'use client'
import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'

import crest262 from '@/assets/img/crest-262.png'
import SanityLink from '@/components/SanityComponents/SanityLink'
import Container from '@/components/shared/Container'
import type { SettingsPayload } from '@/types'

import NavMenu from './NavMenu'
import SpinningLogo from './SpinningLogo'

interface NavbarProps {
  data: SettingsPayload
}

export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || []
  
  // Function to insert empty objects between menu items
  const insertEmptyObjects = (items: NonNullable<SettingsPayload['menuItems']>): Array<NonNullable<SettingsPayload['menuItems']>[number] | { isSpacerItem: true }> => {
    return items.reduce((acc, item, index) => {
      acc.push(item)
      if (index < items.length - 1) {
        acc.push({ isSpacerItem: true })
      }
      return acc
    }, [] as Array<NonNullable<SettingsPayload['menuItems']>[number] | { isSpacerItem: true }>)
  }
  
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const newMenuItems = insertEmptyObjects(menuItems)

  return (
    <nav className="fixed w-full top-0 left-0 z-[999] py-4">
      <Container>
        <div className="flex justify-between items-center">
          <div className="w-1/6">
            <Link href="/" className="relative block w-[90px] h-[90px]">
              <Image
                src={crest262}
                alt="logo"
                width={90}
                height={90}
                className="absolute top-0 left-0 z-10"
              />
              <SpinningLogo />
            </Link>
          </div>
          
          {menuItems && menuItems.length > 0 && (
            <div className="w-4/6 hidden md:block">
              <div className="flex gap-4 items-center justify-center w-auto rounded-full bg-brand-black/60 text-white backdrop-blur-sm p-4 shadow">
                {newMenuItems.map((item, index) => {
                  if ('isSpacerItem' in item) {
                    return (
                      <div key={`spacer-${index}`} className="bg-white h-[1px] w-24"></div>
                    )
                  }
                  return (
                    <SanityLink data={item} key={`menu-${index}`}>
                      <span className="uppercase hover:text-brand-orange transition-colors">
                        {item.linkText}
                      </span>
                    </SanityLink>
                  )
                })}
              </div>
            </div>
          )}
          
          <div className="w-1/6 flex justify-end">
            <div className="block md:hidden">
              <NavMenu
                navData={data}
                isMenuOpen={isMenuOpen}
                setIsMenuOpen={setIsMenuOpen}
              />
            </div>
          </div>
        </div>
      </Container>
    </nav>
  )
}
