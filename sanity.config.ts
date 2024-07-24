'use client'
/**
 * This config is used to set up Sanity Studio that's mounted on the `app/studio/[[...index]]/Studio.tsx` route
 */

import { visionTool } from '@sanity/vision'
import { defineConfig } from 'sanity'
import { presentationTool } from 'sanity/presentation'
import { structureTool } from 'sanity/structure'
import { unsplashImageAsset } from 'sanity-plugin-asset-source-unsplash'

import { apiVersion, dataset, projectId, studioUrl } from '@/sanity/lib/api'
import * as resolve from '@/sanity/plugins/resolve'
import { pageStructure, singletonPlugin } from '@/sanity/plugins/settings'
import farm from '@/sanity/schemas/documents/farm'
import page from '@/sanity/schemas/documents/page'
import home from '@/sanity/schemas/singletons/home'
import settings from '@/sanity/schemas/singletons/settings'

import carouselCTA from './sanity/schemas/objects/blocks/carouselCTA'
import carouselItem from './sanity/schemas/objects/blocks/carouselItem'
import featuredCTA from './sanity/schemas/objects/blocks/featuredCTA'
import hero from './sanity/schemas/objects/blocks/hero'
import twoColText from './sanity/schemas/objects/blocks/twoColText'
import twoImages from './sanity/schemas/objects/blocks/twoImages'
import link from './sanity/schemas/objects/link'
import restrictedRichText from './sanity/schemas/objects/restrictedRichText'
import richText from './sanity/schemas/objects/richText'

const title =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_TITLE ||
  'Next.js Personal Website with Sanity.io'

export default defineConfig({
  basePath: studioUrl,
  projectId: projectId || '',
  dataset: dataset || '',
  title,
  schema: {
    // If you want more content types, you can add them to this array
    types: [
      // Singletons
      home,
      settings,
      // Documents
      page,
      farm,
      // Objects
      richText,
      restrictedRichText,
      link,
      // block objects
      hero,
      featuredCTA,
      carouselCTA,
      carouselItem,
      twoColText,
      twoImages,
    ],
  },
  plugins: [
    structureTool({
      structure: pageStructure([home, settings]),
    }),
    presentationTool({
      resolve,
      previewUrl: {
        previewMode: {
          enable: '/api/draft',
        },
      },
    }),
    // Configures the global "new document" button, and document actions, to suit the Settings document singleton
    singletonPlugin([home.name, settings.name]),
    // Add an image asset source for Unsplash
    unsplashImageAsset(),
    // Vision lets you query your content with GROQ in the studio
    // https://www.sanity.io/docs/the-vision-plugin
    visionTool({ defaultApiVersion: apiVersion }),
  ],
})
