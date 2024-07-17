import { defineArrayMember, defineField, defineType } from 'sanity'

// write a hero schema with a title, subtitle, background image, array of max two buttons

export default defineType({
  type: 'object',
  name: 'hero',
  title: 'Hero',
  fields: [
    defineField({
      type: 'string',
      name: 'title',
      title: 'Title',
      validation: (rule) => rule.required(),
    }),
    defineField({
      type: 'restrictedRichText',
      name: 'subtitle',
      title: 'Subtitle',
      validation: (rule) => rule.required(),
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
        title: `Hero: ${title}`,
      }
    },
  },
})
