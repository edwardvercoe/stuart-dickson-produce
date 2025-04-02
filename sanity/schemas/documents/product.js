export default {
  name: 'product',
  title: 'Product',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Product Name',
      type: 'string',
      validation: Rule => Rule.required()
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: Rule => Rule.required()
    },
    {
      name: 'available',
      title: 'Available for Order',
      type: 'boolean',
      initialValue: true
    },
    {
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order products appear within their category'
    },
    {
      name: 'notes',
      title: 'Product Notes',
      type: 'text',
      description: 'Any additional information about this product'
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
      category: 'category.title',
      available: 'available'
    },
    prepare(selection) {
      const {title, category, available} = selection
      return {
        title: title,
        subtitle: `${category || 'Uncategorized'} ${available === false ? '- Not Available' : ''}`
      }
    }
  }
} 