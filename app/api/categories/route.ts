import { NextResponse } from 'next/server'
import { getServerClient } from '@/sanity/lib/client'
import { categoriesWithProductsQuery } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const client = getServerClient()
    const categories = await client.fetch(categoriesWithProductsQuery)
    return NextResponse.json(categories)
  } catch (error) {
    console.error('Error fetching categories:', error)
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 },
    )
  }
} 