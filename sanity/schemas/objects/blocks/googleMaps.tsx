import { defineField } from 'sanity'

const googleMaps = {
  title: 'Google Maps',
  name: 'googleMaps',
  type: 'object',
  fields: [
    defineField({
      name: 'coordinates',
      title: 'Coordinates',
      type: 'geopoint',
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
    prepare({}) {
      return {
        title: `Google Maps`,
      }
    },
  },
}

export default googleMaps
