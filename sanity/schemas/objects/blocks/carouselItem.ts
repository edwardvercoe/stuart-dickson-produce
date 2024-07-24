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
      title: 'Link to Page or Farm',
      name: 'page',
      type: 'reference',
      description: 'Select a page or farm to link to',
      to: [{ type: 'page' }, { type: 'farm' }],
    },
  ],
}
