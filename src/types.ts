export type YouTubeVideoDetails = {
  id: string
  snippet: {
    title: string
    description: string
    publishedAt: string
    thumbnails: {
      maxres: {
        url: string
        height: number
        width: number
      }
    }
  }
  contentDetails: {
    duration: string
  }
}
