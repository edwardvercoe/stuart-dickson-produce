// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { defineLive, type QueryParams } from 'next-sanity'
import { client } from './client'
import { getToken } from './token'

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Only use token on the server
  serverToken: getToken(),
  // Never pass token to the browser
  browserToken: undefined,
})

// New wrapper enforcing stega default for live fetching
export async function sanityFetchWithDefaults<T>(options: {
  query: string
  params?: QueryParams
  tags?: string[]
  stega?: boolean
}) {
  const result = await sanityFetch<string>({
    ...options,
    stega: options.stega ?? true,
  })
  return result as unknown as { data: T }
}

// New static fetch for static generation (avoids draftMode)
export const sanityStaticFetch = (options: {
  query: string
  params?: Record<string, unknown>
}) => client.fetch(options.query, options.params)
