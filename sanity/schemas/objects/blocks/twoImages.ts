// write schema for twoImages block

const twoImages = {
  title: 'Two Images',
  name: 'twoImages',
  type: 'object',
  fields: [
    {
      title: 'Variation',
      name: 'variation',
      type: 'string',
      description: 'Choose the layout variation. Default is apart.',
      options: {
        list: [
          { title: 'Apart', value: 'apart' },
          { title: 'Side by side', value: 'sideBySide' },
        ],
        layout: 'radio',
      },
      defaultValue: 'apart',
    },
    {
      Title: 'Text',
      name: 'text',
      type: 'restrictedRichText',
    },
    {
      title: 'Image Left',
      name: 'imageLeft',
      type: 'image',
    },
    {
      title: 'Image Right',
      name: 'imageRight',
      type: 'image',
    },
  ],
  preview: {
    select: {
      variation: 'variation',
    },
    prepare({ variation }) {
      return {
        title: `Two Images`,
        subtitle: `Variation: ${variation}`,
      }
    },
  },
}

export default twoImages
