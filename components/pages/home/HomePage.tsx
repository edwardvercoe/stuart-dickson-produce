import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import { PageBuilder } from '@/components/shared/PageBuilder'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { pageBuilder = [] } = data ?? {}

  return (
    <div>
      {/* Page Builder */}
      <PageBuilder data={pageBuilder} />
    </div>
  )
}

export default HomePage
