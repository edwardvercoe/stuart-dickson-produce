import { loadSettings } from '@/sanity/loader/loadQuery'

import NavbarLayout from './Navigation'

export async function Navbar() {
  const initial = await loadSettings()


  return <NavbarLayout data={initial.data} />
}
