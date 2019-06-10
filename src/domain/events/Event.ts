export interface EventCommentAdded {
  type: 'comment_added'
  comment: {
    spotId: string
    author: {
      id: string
      username: string
    }
    body: string
    createdAt: string
    id: string
  }
}

export type Event = EventCommentAdded
