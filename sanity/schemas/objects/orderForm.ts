import { defineField, defineType } from 'sanity'
import { DocumentsIcon } from '@sanity/icons' // Use Sanity icon

export const orderForm = defineType({
  name: 'orderForm',
  title: 'Order Form',
  type: 'object',
  icon: DocumentsIcon, // Use Sanity icon
  fields: [
    defineField({
        name: 'title', // Renamed from heading
        title: 'Form Title',
        type: 'string',
        description: 'The main title displayed at the top of the form (e.g., "Produce Order Sheet").',
        validation: Rule => Rule.required(), // Make title required
    }),
    defineField({
      name: 'email',
      title: 'Contact Email',
      type: 'string',
    }),
    defineField({
      name: 'phone',
      title: 'Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'fax',
      title: 'Contact Fax',
      type: 'string',
    }),
    // Add any other configuration fields if needed in the future
    // For now, it mostly acts as a placeholder to trigger rendering the component
  ],
  preview: {
    select: {
        title: 'title' // Select the new title field
    },
    prepare({ title }) {
      return {
        title: title || 'Order Form',
        subtitle: 'Displays the interactive product order form.',
        media: DocumentsIcon, // Use Sanity icon in preview
      }
    },
  },
}) 