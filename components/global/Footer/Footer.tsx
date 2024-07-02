import type { PortableTextBlock } from 'next-sanity'

import SanityLink from '@/components/SanityComponents/SanityLink'
import { CustomPortableText } from '@/components/shared/CustomPortableText'
import type { MenuItem, SettingsPayload } from '@/types'

interface FooterProps {
  data: SettingsPayload
}
export default function Footer(props: FooterProps) {
  const { data } = props
  const footer = data?.footer || ([] as PortableTextBlock[])
  const menuItems = data?.menuItems || ([] as MenuItem[])

  return (
    <footer className="bottom-0 w-full text-white bg-brand-black py-12">
      <div className="flex sm:gap-10 flex-col sm:flex-row pb-6">
        <div className="flex-1">
          <p>Stuart Dickson Produce</p>
          <div className="max-w-[560px]">
            <p className="text-sm">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
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
