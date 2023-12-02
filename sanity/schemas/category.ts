import {SchemaTypeDefinition} from '@sanity/types'
import {BiCategory} from 'react-icons/bi'

const category: SchemaTypeDefinition = {
  name: 'category',
  title: 'Category',
  type: 'document',
  icon: BiCategory,
  fields: [
    {
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
  ],
  /*   preview: {
    select: {title: 'title', media: 'image'},
  }, */
}

export default category
