import { createClient } from 'next-sanity'

import { apiVersion, dataset, projectId, studioUrl } from './api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: 'published',
  stega: {
    studioUrl,
    logger: console,
    filter: (props) => {
      if (props.sourcePath.at(-1) === 'title') {
        return true
      }
      return props.filterDefault(props)
    },
  },
})

// Create a server-only client that includes the token
export function getServerClient() {
  if (typeof window !== 'undefined') {
    throw new Error('Server client can only be used server-side')
  }
  return client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
    perspective: 'published',
  })
}

// Create a preview-mode client that includes the token
export function getPreviewClient() {
  return client.withConfig({
    token: process.env.SANITY_API_READ_TOKEN,
    useCdn: false,
    perspective: 'previewDrafts',
  })
}

// Log warning about stega usage
console.warn(
  'This template is using stega to embed Content Source Maps, see more information here: https://www.sanity.io/docs/loaders-and-overlays#26cf681fadd4',
)
