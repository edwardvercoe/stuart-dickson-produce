const carouselCTA = {
  title: 'Carousel CTA',
  name: 'carouselCTA',
  type: 'object',
  fields: [
    {
      title: 'Carousel Items',
      name: 'carouselItems',
      type: 'array',
      of: [{ type: 'carouselItem' }],
    },
  ],
  preview: {
    // select: {
    //   title: 'title',
    // },
    prepare({}) {
      return {
        title: `Carousel CTA`,
      }
    },
  },
}

export default carouselCTA
