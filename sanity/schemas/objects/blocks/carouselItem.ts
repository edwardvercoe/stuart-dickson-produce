// object schema for carousel item with title, caption, backgroundImage and reference to a page

export default {
  title: 'Carousel Item',
  name: 'carouselItem',
  type: 'object',
  fields: [
    {
      title: 'Title',
      name: 'title',
      type: 'string',
    },
    {
      title: 'Subtitle',
      name: 'subtitle',
      type: 'string',
    },
    {
      title: 'Description',
      name: 'description',
      type: 'restrictedRichText',
    },
    {
      title: 'Caption',
      name: 'caption',
      type: 'string',
    },
    {
      title: 'Background Image',
      name: 'backgroundImage',
      type: 'image',
      validation: (Rule) => Rule.required(),
    },

    {
      type: 'array',
      name: 'buttons',
      title: 'Buttons',
      of: [
        {
          type: 'link',
        },
      ],
      validation: (rule) => rule.max(2),
    },
  ],
}
