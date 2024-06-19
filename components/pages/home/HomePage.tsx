import type { EncodeDataAttributeCallback } from '@sanity/react-loader'

import { Header } from '@/components/shared/Header'
import { PageBuilder } from '@/components/shared/PageBuilder'
import type { HomePagePayload } from '@/types'

export interface HomePageProps {
  data: HomePagePayload | null
  encodeDataAttribute?: EncodeDataAttributeCallback
}

export function HomePage({ data, encodeDataAttribute }: HomePageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { pageBuilder = [], title = '' } = data ?? {}

  return (
    <div className="space-y-20">
      {/* Header */}
      {title && <Header centered title={title} />}
      {/* Page Builder */}
      <PageBuilder data={pageBuilder} />
    </div>
  )
}

export default HomePage
