import { defineField, defineType } from 'sanity'

const seo = defineType({
  name: 'seo',
  title: 'SEO & Social Metadata',
  type: 'object',
  options: {
    collapsible: true,
    collapsed: true,
  },
  fields: [
    {
      name: 'title',
      title: 'SEO Title',
      description:
        'SEO titles between 40 and 50 characters with commonly searched words have the best click-through-rates',
      validation: (Rule) => [Rule.max(100).error('Maximum 100 characters.')],
      type: 'string',
    },
    {
      name: 'description',
      title: 'SEO Description',
      description:
        'Good SEO descriptions utilise keywords, summarise the story and are between 140-156 characters long.',
      validation: (Rule) => [
        Rule.min(1).max(156).error('Maximum 156 characters.'),
      ],
      type: 'text',
    },
    defineField({
      name: 'image',
      title: 'Social Image',
      type: 'image',
      description:
        "Optional image that will be used when diplsaying page previews on social media. Image will be resized and cropped to 1200 x 630 automatically. If not supplied we'll fall back to the generic image.",
      options: {
        hotspot: true,
      },
    }),
  ],
})

export default seo
