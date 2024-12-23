import {SettingsView, useSecrets} from '@sanity/studio-secrets'
import {Container} from '@sanity/ui'
import {ReactNode} from 'react'

import {VideoFetch} from './VideoFetch'

const namespace = `sanity-plugin-youtube-documents`
const pluginConfigKeys = [
  {
    key: 'apiKey',
    title: 'Enter your YouTube API key',
  },
]

export function YouTubeDocumentsTool(): ReactNode {
  const {secrets} = useSecrets<{apiKey: string}>(namespace)

  return (
    <Container padding={4} width={1}>
      {secrets?.apiKey ? (
        <VideoFetch apiKey={secrets.apiKey} />
      ) : (
        <SettingsView
          title="Required"
          namespace={namespace}
          keys={pluginConfigKeys}
          onClose={() => {}}
        />
      )}
    </Container>
  )
}
