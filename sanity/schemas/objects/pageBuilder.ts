// write page builder schema
import { defineArrayMember, defineField, defineType } from 'sanity'

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
  ],
})

export default pageBuilder
