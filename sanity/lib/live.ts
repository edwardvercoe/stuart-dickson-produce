// Querying with "sanityFetch" will keep content automatically updated
// Before using it, import and render "<SanityLive />" in your layout, see
// https://github.com/sanity-io/next-sanity#live-content-api for more information.
import { createClient, defineLive, type QueryParams } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/lib/api";

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  stega: {
    studioUrl: "/studio",
  },
});

export const { sanityFetch, SanityLive } = defineLive({
  client,
  // Only use token on the server
  serverToken: process.env.SANITY_API_READ_TOKEN,
  // Never pass token to the browser
  browserToken: undefined,
});

// New wrapper enforcing stega default for live fetching
export async function sanityFetchWithDefaults<T>(options: {
  query: string;
  params?: QueryParams;
  tags?: string[];
  stega?: boolean;
}) {
  const result = await sanityFetch<string>({
    ...options,
    stega: options.stega ?? false,
  });
  return result as unknown as { data: T };
}

// New static fetch for static generation (avoids draftMode)
export const sanityStaticFetch = (options: {
  query: string;
  params?: Record<string, unknown>;
}) => client.fetch(options.query, options.params);
