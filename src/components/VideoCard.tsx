import {Button, Card, Grid, Stack, Text, useToast} from '@sanity/ui'
import {ReactNode} from 'react'
import {Preview, SanityDocument, useClient, useSchema} from 'sanity'
import {Feedback} from 'sanity-plugin-utils'

import {youTubeVideoType} from '../schemaTypes/youTubeVideoType'
import {YouTubeVideoDetails} from '../types'

function getHighestResolutionThumbnail(
  thumbnails: Record<string, {url: string; width: number; height: number}>,
): {
  url: string
  width: number
  height: number
} {
  if (thumbnails.maxres) {
    return {
      url: thumbnails.maxres.url,
      width: thumbnails.maxres.width,
      height: thumbnails.maxres.height,
    }
  } else if (thumbnails.high) {
    return {
      url: thumbnails.high.url,
      width: thumbnails.high.width,
      height: thumbnails.high.height,
    }
  }
  return {
    url: thumbnails.default.url,
    width: thumbnails.default.width,
    height: thumbnails.default.height,
  }
}

type VideoCardProps = {
  videoDetails?: YouTubeVideoDetails
  existingDocuments: SanityDocument[]
  isLoading: boolean
  setIsLoading: (value: boolean) => void
}

export function VideoCard({
  videoDetails,
  existingDocuments,
  isLoading,
  setIsLoading,
}: VideoCardProps): ReactNode {
  const toast = useToast()
  const client = useClient({apiVersion: `2024-12-23`})
  const existingDocument = existingDocuments.find((doc) => doc.id === videoDetails?.id)
  const schemaType = useSchema().get(youTubeVideoType.name)

  const handleCreateDocument = () => {
    if (!videoDetails) {
      toast.push({
        status: 'error',
        title: 'No video details',
        description: 'No video details to create document from',
      })
      return
    }
    setIsLoading(true)
    const thumbnail = getHighestResolutionThumbnail(videoDetails.snippet.thumbnails)
    client
      .createOrReplace({
        _id: `youtubeVideo-${videoDetails?.id}`,
        _type: youTubeVideoType.name,
        id: videoDetails.id,
        title: videoDetails.snippet.title,
        description: videoDetails.snippet.description,
        thumbnailUrl: thumbnail.url,
        publishedAt: videoDetails.snippet.publishedAt,
        duration: videoDetails.contentDetails.duration,
      })
      .then((res) => {
        setIsLoading(false)
        toast.push({
          status: 'success',
          title: 'Document created',
          description: `Document with ID ${res._id} created`,
        })
      })
      .catch((err) => {
        setIsLoading(false)
        toast.push({
          status: 'error',
          title: 'Failed to create document',
          description: err.message,
        })
      })
  }

  if (!videoDetails) {
    return <Feedback tone="caution">No video details to display</Feedback>
  }

  const thumbnail = getHighestResolutionThumbnail(videoDetails.snippet.thumbnails)

  return (
    <Card shadow={1} radius={2} padding={4}>
      <Stack space={4}>
        <Grid columns={3} gap={4}>
          <Stack space={3}>
            <img
              style={{width: `100%`, height: `auto`}}
              src={thumbnail.url}
              width={thumbnail.width}
              height={thumbnail.height}
              alt={videoDetails.snippet.title}
            />
          </Stack>
          <Stack space={3} columnStart={2} columnEnd={4}>
            <Text size={2} weight="semibold">
              {videoDetails.snippet.title}
            </Text>
            <Text>{videoDetails.snippet.description}</Text>
          </Stack>
        </Grid>
        {existingDocument && schemaType && (
          <Card borderTop paddingTop={4}>
            <Stack space={2}>
              <Text size={1} weight="semibold">
                This video has already been imported
              </Text>
              <Card border>
                <Preview schemaType={schemaType} value={existingDocument} layout="default" />
              </Card>
            </Stack>
          </Card>
        )}
        <Button
          text={existingDocument ? `Update document` : `Create document`}
          onClick={handleCreateDocument}
          disabled={isLoading}
        />
      </Stack>
    </Card>
  )
}
