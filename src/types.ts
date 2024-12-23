export type YouTubeVideoDetails = {
  id: string
  snippet: {
    title: string
    description: string
    thumbnails: {
      maxres: {
        url: string
        height: number
        width: number
      }
    }
  }
}
