import { DocumentIcon } from '@sanity/icons'
import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'farm',
  title: 'Farms',
  type: 'document',
  icon: DocumentIcon,

  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
        isUnique: (value, context) => context.defaultIsUnique(value, context),
      },
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'restrictedRichText',
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      description: 'This image will be used as the cover image for the farm.',
      type: 'image',
      validation: (rule) => rule.required(),
    }),
  ],
})
