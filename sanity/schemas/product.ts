import {SchemaTypeDefinition} from '@sanity/types'
import {RiMacbookLine} from 'react-icons/ri'

const Product: SchemaTypeDefinition = {
  name: 'product',
  title: 'Product',
  type: 'document',
  icon: RiMacbookLine,
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
    {
      name: 'image',
      title: 'Image',
      type: 'array',
      of: [{type: 'image'}],
      options: {
        hotspot: true,
      },
    },
    {
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{type: 'category'}],
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'price',
      title: 'Price',
      type: 'number',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    },
  ],
  preview: {
    select: {title: 'title', media: 'image'},
  },
}

export default Product
