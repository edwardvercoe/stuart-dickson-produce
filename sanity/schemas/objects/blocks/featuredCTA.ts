// write a schema for featuredCTA with a headline, description, image and an array of up to two buttons

import { defineArrayMember, defineField, defineType } from 'sanity'

export default defineType({
  type: 'object',
  name: 'featuredCTA',
  title: 'Featured CTA',
  fields: [
    defineField({
      name: 'variation',
      title: 'Variation',
      type: 'string',
      options: {
        list: ['left', 'centered'],
        layout: 'radio',
        direction: 'horizontal',
      },
      initialValue: 'left',
    }),
    defineField({
      type: 'text',
      name: 'title',
      title: 'Title',
      rows: 3,
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'text',
      name: 'subtitle',
      title: 'Subtitle',
      rows: 1,
    }),
    defineField({
      type: 'restrictedRichText',
      name: 'description',
      title: 'Description',
    }),
    defineField({
      type: 'image',
      name: 'backgroundImage',
      title: 'Background Image',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'image',
      name: 'foregroundImage',
      title: 'Foreground Image',
    }),
    defineField({
      type: 'array',
      name: 'buttons',
      title: 'Buttons',
      of: [
        {
          type: 'link',
        },
      ],
      validation: (rule) => rule.max(2),
    }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        title: `Featured CTA: ${title}`,
      }
    },
  },
})
