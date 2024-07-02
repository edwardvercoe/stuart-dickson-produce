import SanityLink from '@/components/SanityComponents/SanityLink'
import type { MenuItem, SettingsPayload } from '@/types'

interface NavbarProps {
  data: SettingsPayload
}
export default function Navbar(props: NavbarProps) {
  const { data } = props
  const menuItems = data?.menuItems || ([] as MenuItem[])
  return (
    <nav className="fixed w-full top-0 left-0 z-10 flex flex-wrap items-center bg-white/80 py-4 backdrop-blur">
      {menuItems && (
        <div className="flex gap-4">
          {menuItems.map((item, index) => (
            <SanityLink data={item} key={item._key}>
              {item.linkText}
            </SanityLink>
          ))}
        </div>
      )}
    </nav>
  )
}
