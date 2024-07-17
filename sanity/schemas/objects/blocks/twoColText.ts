// write schema for two col text using restricted rich text

const twoColText = {
  title: 'Two Column Text',
  name: 'twoColText',
  type: 'object',
  fields: [
    {
      title: 'Variation',
      name: 'variation',
      type: 'string',
      description: 'Choose the width layout variation. Default is 50/50.',
      options: {
        list: [
          { title: '50/50', value: '50/50' },
          { title: '30/70', value: '30/70' },
        ],
        layout: 'radio',
      },
      defaultValue: '50/50',
    },
    {
      title: 'Left Column',
      name: 'leftColumn',
      type: 'restrictedRichText',
    },
    {
      title: 'Right Column',
      name: 'rightColumn',
      type: 'restrictedRichText',
    },
  ],
  preview: {
    select: {
      variation: 'variation',
    },
    prepare({ variation }) {
      return {
        title: `Two Column Text`,
        subtitle: `Variation: ${variation}`,
      }
    },
  },
}

export default twoColText
