import {defineField, defineType} from 'sanity'

export const post = defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'video',
      type: 'reference',
      to: [{type: 'youTubeVideo'}],
    }),
  ],
})
