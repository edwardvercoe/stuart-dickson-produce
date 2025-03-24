import { createClient } from 'next-sanity'

import {
  apiVersion,
  dataset,
  projectId,
  revalidateSecret,
  studioUrl,
} from '@/sanity/lib/api'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  // If webhook revalidation is setup we want the freshest content, if not then it's best to use the speedy CDN
  useCdn: revalidateSecret ? false : true,
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

console.warn(
  'This template is using stega to embed Content Source Maps, see more information here: https://www.sanity.io/docs/loaders-and-overlays#26cf681fadd4',
)
