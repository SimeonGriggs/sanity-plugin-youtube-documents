import {definePlugin} from 'sanity'

import {YouTubeDocumentsTool} from './components/YouTubeDocumentsTool'
import {youTubeVideoType} from './schemaTypes/youTubeVideoType'

export const youTubeDocuments = definePlugin(() => {
  return {
    name: 'sanity-plugin-youtube-documents',
    schema: {types: [youTubeVideoType]},
    tools: [
      {
        name: 'youtube-documents',
        title: 'YouTube Documents',
        component: YouTubeDocumentsTool,
      },
    ],
  }
})
