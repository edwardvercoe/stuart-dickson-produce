import Image from 'next/image'

import LogoWhite from '@/assets/svg/logoWhite.svg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import PortableTextBlock from '@/components/shared/PortableText/PortableTextBlock'
import type { MenuItem, SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || []
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <footer className="bottom-0 w-full text-white bg-brand-black py-12">
      <div className="flex sm:gap-10 flex-col sm:flex-row pb-6">
        <div className="flex-1">
          <div className="pb-4">
            <Image src={LogoWhite} alt="logo" width={70} height={70} />
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
            </div>
          )}
        </div>
      </div>
      <div className="border-t border-gray-400 py-6">
        <p className="text-xs">
          © Copyright {new Date().getFullYear()}, Stuart Dickson Produce All
          Rights Reserved
        </p>
      </div>
    </footer>
  )
}
