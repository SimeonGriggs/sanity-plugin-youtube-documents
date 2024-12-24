import {defineField, defineType} from 'sanity'

export const youTubeVideoType = defineType({
  name: 'youTubeVideo',
  title: 'YouTube Video',
  type: 'document',
  readOnly: true,
  fields: [
    defineField({
      name: 'id',
      type: 'string',
    }),
    defineField({
      name: 'title',
      type: 'string',
    }),
    defineField({
      name: 'description',
      type: 'text',
    }),
    defineField({
      name: 'thumbnailUrl',
      type: 'url',
    }),
    defineField({
      name: 'publishedAt',
      type: 'datetime',
    }),
    defineField({
      name: 'duration',
      type: 'string',
    }),
  ],
})
