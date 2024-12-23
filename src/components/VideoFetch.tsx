import {Box, Button, Card, Flex, Stack, Text, TextInput} from '@sanity/ui'
import getYouTubeID from 'get-youtube-id'
import {ChangeEvent, ReactNode, useState} from 'react'
import {SanityDocument} from 'sanity'
import {Feedback, useListeningQuery} from 'sanity-plugin-utils'

import {youTubeVideoType} from '../schemaTypes/youTubeVideoType'
import {YouTubeVideoDetails} from '../types'
import {VideoCard} from './VideoCard'

type VideoFetchProps = {
  apiKey: string
}

export function VideoFetch({apiKey}: VideoFetchProps): ReactNode {
  const [videoUrl, setVideoUrl] = useState('https://www.youtube.com/watch?v=gtUyJOOoUwY')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [videoDetails, setVideoDetails] = useState<YouTubeVideoDetails | null>(null)
  const {data: existingDocuments} = useListeningQuery<SanityDocument[]>(`*[_type == $type]`, {
    params: {type: youTubeVideoType.name},
  })

  const fetchYouTubeVideoDetails = async () => {
    setIsLoading(true)
    setError(null)
    setVideoDetails(null)

    try {
      const videoId = getYouTubeID(videoUrl)
      if (!videoId) {
        throw new Error('Invalid YouTube URL')
      }

      if (!apiKey) {
        throw new Error('YouTube API key not configured')
      }

      const response = await fetch(
        `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${videoId}&key=${apiKey}`,
      )

      if (!response.ok) {
        throw new Error('Failed to fetch video details')
      }

      const data = await response.json()
      if (!data.items || data.items.length === 0) {
        throw new Error('Video not found')
      }

      setVideoDetails(data.items[0])
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setIsLoading(false)
    }
  }

  const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
    setVideoUrl(event.currentTarget.value)
  }

  return (
    <Stack space={4}>
      <Card shadow={1} radius={2}>
        <Flex direction="column" gap={3} padding={4}>
          <Text size={1} weight="semibold">
            Fetch a YouTube video by URL
          </Text>
          <Flex gap={1} align="center">
            <Box flex={1}>
              <TextInput
                onChange={handleInputChange}
                placeholder="Enter YouTube URL"
                disabled={isLoading}
                value={videoUrl}
              />
            </Box>
            <Button
              mode="default"
              disabled={isLoading || !videoUrl}
              onClick={fetchYouTubeVideoDetails}
              text={isLoading ? 'Loading...' : 'Fetch'}
            />
          </Flex>
          {error && <Feedback tone="critical">{error}</Feedback>}
        </Flex>
      </Card>

      {videoDetails && (
        <VideoCard
          videoDetails={videoDetails}
          existingDocuments={existingDocuments as SanityDocument[]}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
      )}
    </Stack>
  )
}
