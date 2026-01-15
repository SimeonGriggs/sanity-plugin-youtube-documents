import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {schemaTypes} from './schemaTypes'
import {youTubeDocuments} from 'sanity-plugin-youtube-documents'

const projectId = process.env.SANITY_STUDIO_PROJECT_ID!
const dataset = process.env.SANITY_STUDIO_DATASET!

export default defineConfig({
  name: 'default',
  title: 'YouTube Documents Plugin Dev',

  projectId,
  dataset,

  plugins: [structureTool(), youTubeDocuments()],

  schema: {
    types: schemaTypes,
  },
})
