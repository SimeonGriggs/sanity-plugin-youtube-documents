import {Button, Card, Grid, Stack, Text, useToast} from '@sanity/ui'
import {ReactNode} from 'react'
import {Preview, SanityDocument, useClient, useSchema} from 'sanity'

import {youTubeVideoType} from '../schemaTypes/youTubeVideoType'
import {YouTubeVideoDetails} from '../types'

type VideoCardProps = {
  videoDetails: YouTubeVideoDetails
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
  const existingDocument = existingDocuments.find((doc) => doc.id === videoDetails.id)
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
    client
      .createOrReplace({
        _id: `youtubeVideo-${videoDetails?.id}`,
        _type: youTubeVideoType.name,
        id: videoDetails?.id,
        title: videoDetails?.snippet.title,
        description: videoDetails?.snippet.description,
        thumbnailUrl: videoDetails?.snippet.thumbnails.maxres.url,
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

  return (
    <Card shadow={1} radius={2} padding={4}>
      <Stack space={4}>
        <Grid columns={3} gap={4}>
          <Stack space={3}>
            <img
              style={{width: `100%`, height: `auto`}}
              src={videoDetails.snippet.thumbnails.maxres.url}
              width={videoDetails.snippet.thumbnails.maxres.width}
              height={videoDetails.snippet.thumbnails.maxres.height}
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
