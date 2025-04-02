export default {
  name: 'category',
  title: 'Product Category',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order categories appear in the form'
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }
  ],
  preview: {
    select: {
      title: 'title',
      order: 'order'
    },
    prepare(selection) {
      const {title, order} = selection
      return {
        title: title,
        subtitle: `Order: ${order || 'Not set'}`
      }
    }
  }
} 