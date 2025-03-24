import { PageBuilder } from '@/components/shared/PageBuilder'
import type { PagePayload } from '@/types'

export interface PageProps {
  data: PagePayload | null
}

export function Page({ data }: PageProps) {
  // Default to an empty object to allow previews on non-existent documents
  const { pageBuilder = [] } = data ?? {}

  return (
      <PageBuilder data={pageBuilder} />
  )
}

export default Page
