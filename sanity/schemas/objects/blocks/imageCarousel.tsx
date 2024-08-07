// schema for image carousel - array of images

import { defineArrayMember, defineField, defineType } from 'sanity'

const imageCarousel = defineType({
  type: 'object',
  name: 'imageCarousel',
  title: 'Image Carousel',
  fields: [
    defineField({
      type: 'array',
      name: 'images',
      title: 'Images',
      of: [
        {
          type: 'image',
        },
      ],
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare({}) {
      return {
        title: `Image Carousel`,
      }
    },
  },
})

export default imageCarousel
