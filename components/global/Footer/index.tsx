
import { loadSettings } from '@/sanity/loader/loadQuery'

import FooterLayout from './Footer'

export async function Footer() {
  const initial = await loadSettings()

  return <FooterLayout data={initial.data} />
}
