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
    },
    {
      title: 'Page',
      name: 'page',
      type: 'reference',
      to: [{ type: 'page' }],
    },
  ],
}
