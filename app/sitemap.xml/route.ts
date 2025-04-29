import { client } from '@/sanity/lib/client'
import groq from 'groq'
import { MetadataRoute } from 'next'
import { headers } from 'next/headers'

type SitemapEntry = {
  _updatedAt: string
  slug: string
  _type: string
}

export async function GET(): Promise<Response> {
  const headersList = await headers()
  const host = headersList.get('host') || ''
  const protocol = process.env.NODE_ENV === 'development' ? 'http' : 'https'
  const baseUrl = `${protocol}://${host}`

  // Query all published documents that have slugs, excluding products, categories, and farms
  const query = groq`*[
    defined(slug.current) && 
    !(_type in ["product", "category", "farm"]) &&
    !(_id in path("drafts.**"))
  ] {
    _type,
    _updatedAt,
    "slug": slug.current
  }`

  try {
    const entries = await client.fetch<SitemapEntry[]>(query)

    // Generate sitemap XML
    const xml = `<?xml version="1.0" encoding="UTF-8"?>
    <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
      <url>
        <loc>${baseUrl}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>daily</changefreq>
        <priority>1.0</priority>
      </url>
      ${entries
        .map((entry) => {
          // Determine the URL path based on document type
          let path = ''
          switch (entry._type) {
            case 'page':
              path = `/${entry.slug}`
              break
            default:
              path = `/${entry._type}/${entry.slug}`
          }

          return `
        <url>
          <loc>${baseUrl}${path}</loc>
          <lastmod>${entry._updatedAt}</lastmod>
          <changefreq>weekly</changefreq>
          <priority>0.8</priority>
        </url>
      `
        })
        .join('')}
    </urlset>`

    // Return the XML with proper content type
    return new Response(xml, {
      headers: {
        'Content-Type': 'application/xml',
        'Cache-Control': 'public, max-age=3600, s-maxage=3600',
      },
    })
  } catch (error) {
    console.error('Error generating sitemap:', error)
    return new Response('Error generating sitemap', { status: 500 })
  }
}