import Image from 'next/image'
import Link from 'next/link'

import Logo from '@/assets/svg/logoMin.svg'
import SanityLink from '@/components/SanityComponents/SanityLink'
import type { MenuItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  return (
    <nav className="fixed w-full top-0 left-0 z-40 bg-global-bg py-4 shadow-md">
      <div className="flex justify-between items-center">
        <Link href="/">
          <Image src={Logo} alt="logo" width={70} height={70} />
        </Link>
        {menuItems && (
          <div className="flex gap-4">
            {menuItems.map((item, index) => (
              <SanityLink data={item} key={item._key}>
                {item.linkText}
              </SanityLink>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}
