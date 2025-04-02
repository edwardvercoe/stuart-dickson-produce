import { defineField } from 'sanity'

export default {
  name: 'category',
  title: 'Product Category',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Category Name',
      type: 'string',
      validation: Rule => Rule.required()
    }),
    defineField({
      name: 'order',
      title: 'Display Order',
      type: 'number',
      description: 'Controls the order categories appear in the form'
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96
      }
    }),
    defineField({
      name: 'products',
      title: 'Products in this Category',
      description: 'Select or create products that belong to this category',
      type: 'array',
      of: [
        {
          type: 'reference',
          to: [{ type: 'product' }],
          options: {
            filter: ({ document }) => ({
              filter: 'category._ref == $categoryId',
              params: {
                categoryId: document._id
              }
            }),
            disableNew: false
          }
        }
      ],
      options: {
        layout: 'list'
      }
    })
  ],
  preview: {
    select: {
      title: 'title',
      products: 'products',
      order: 'order'
    },
    prepare({ title, products = [], order }) {
      return {
        title,
        subtitle: `Products: ${products.length} | Order: ${order || 'Not set'}`
      }
    }
  },
  orderings: [
    {
      title: 'Display Order',
      name: 'displayOrder',
      by: [
        {field: 'order', direction: 'asc'}
      ]
    }
  ]
}