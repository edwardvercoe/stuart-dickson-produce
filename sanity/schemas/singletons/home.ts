import { HomeIcon } from '@sanity/icons'
import { defineArrayMember, defineField, defineType } from 'sanity'

import pageBuilder from '../objects/pageBuilder'

export default defineType({
  name: 'home',
  title: 'Home',
  type: 'document',
  icon: HomeIcon,
  // Uncomment below to have edits publish automatically as you type
  // liveEdit: true,
  fields: [
    defineField({
      name: 'title',
      description: 'This field is the title of your website.',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    pageBuilder,
    // defineField({
    //   name: 'overview',
    //   description:
    //     'Used both for the <meta> description tag for SEO, and the personal website subheader.',
    //   title: 'Description',
    //   type: 'array',
    //   of: [
    //     // Paragraphs
    //     defineArrayMember({
    //       lists: [],
    //       marks: {
    //         annotations: [
    //           {
    //             name: 'link',
    //             type: 'object',
    //             title: 'Link',
    //             fields: [
    //               {
    //                 name: 'href',
    //                 type: 'url',
    //                 title: 'Url',
    //               },
    //             ],
    //           },
    //         ],
    //         decorators: [
    //           {
    //             title: 'Italic',
    //             value: 'em',
    //           },
    //           {
    //             title: 'Strong',
    //             value: 'strong',
    //           },
    //         ],
    //       },
    //       styles: [],
    //       type: 'block',
    //     }),
    //   ],
    //   // validation: (rule) => rule.max(155).required(),
    // }),
  ],
  preview: {
    select: {
      title: 'title',
    },
    prepare({ title }) {
      return {
        subtitle: 'Home',
        title,
      }
    },
  },
})
