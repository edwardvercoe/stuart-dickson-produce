// write page builder schema
import { defineField } from 'sanity'

const pageBuilder = defineField({
  name: 'pageBuilder',
  title: 'Page Builder',
  type: 'array',
  of: [
    {
      type: 'hero',
    },
    {
      type: 'featuredCTA',
    },
    {
      type: 'carouselCTA',
    },
    {
      type: 'twoColText',
    },
    {
      type: 'twoImages',
    },
    {
      type: 'imageCarousel',
    },
    {
      type: 'googleMaps',
    },
  ],
})

export default pageBuilder
