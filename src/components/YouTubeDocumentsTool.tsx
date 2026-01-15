import {SettingsView, useSecrets} from '@sanity/studio-secrets'
import {Container, Flex, Spinner} from '@sanity/ui'
import type {ReactNode} from 'react'

import {VideoFetch} from './VideoFetch'

const namespace = `sanity-plugin-youtube-documents`
const pluginConfigKeys = [
  {
    key: 'apiKey',
    title: 'Enter your YouTube API key',
  },
]

export function YouTubeDocumentsTool(): ReactNode {
  const {secrets, loading} = useSecrets<{apiKey: string}>(namespace)

  if (loading) {
    return (
      <Container padding={4} width={1}>
        <Flex align="center" justify="center" padding={5}>
          <Spinner muted />
        </Flex>
      </Container>
    )
  }

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
