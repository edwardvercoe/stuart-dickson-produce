import Image from 'next/image'
import Link from 'next/link'

import LogoWhite from '@/assets/svg/logoWhite.svg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import Container from '@/components/shared/Container'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import type { MenuItem, SettingsPayload } from '@/types'

interface FooterProps {
  settings: SettingsPayload
}

export function Footer({ settings }: FooterProps) {
  const footer = settings?.footer || []
  const menuItems = settings?.menuItems || ([] as MenuItem[])
  return (
    <>
      <section className="full-bleed h-4 flex flex-row relative w-full">
        <div className="bg-brand-mahogany flex-1" />
        <div className="bg-brand-orange flex-1" />
        <div className="bg-accent flex-1" />
      </section>
      <footer className="bottom-0 w-full text-white bg-brand-black py-12">
        <Container>
          <div className="flex sm:gap-10 flex-col sm:flex-row pb-6">
            <div className="flex-1">
              <div className="pb-4 flex flex-col sm:flex-row gap-4 sm:gap-8">
                <Image src={LogoWhite} alt="logo" width={70} height={70} />
                {settings?.contactDetails && (
                  <div className="contact-details">
                    <PortableTextBlock
                      data={settings?.contactDetails}
                      className="text-xs text-white/80"
                    />
                  </div>
                )}
              </div>
              <div className="max-w-[560px] pb-6 sm:pb-0">
                <PortableTextBlock
                  data={footer}
                  className="text-xs text-white/80"
                />
              </div>
            </div>
            <div className="flex-1">
              {menuItems && (
                <div className="flex flex-col gap-4">
                  {menuItems.map((item, index) => (
                    <SanityLink data={item} key={item._key}>
                      {item.linkText}
                    </SanityLink>
                  ))}
                  <Link href="/accreditation">ACCREDITATION</Link>
                </div>
              )}
            </div>
          </div>
          <div className="border-t border-gray-400 py-6 flex flex-row justify-between gap-4">
            <div>
              <p className="text-xs">
                © Copyright {new Date().getFullYear()}, Stuart Dickson Produce
                All Rights Reserved
              </p>
            </div>
          </div>
        </Container>
      </footer>
    </>
  )
}
