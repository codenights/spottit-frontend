import React from 'react'
import { format } from 'date-fns'

import { Map } from '../../ui/Map'
import { Markdown } from '../../ui/Markdown'
import { useSpot } from './hooks'
import {
  AuthoredBy,
  Body,
  Header,
  SpotInfo,
  Comments,
  Comment,
  CommentHeader,
} from './styles'
import { AddComment } from './AddComment'

export interface SpotDetailsProps {
  spotId: string
}

export const SpotDetails: React.FC<SpotDetailsProps> = ({ spotId }) => {
  const [spot, createComment] = useSpot(spotId)

  if (!spot) {
    return <div>Loading...</div>
  }

  return (
    <main>
      <Header>
        <Map
          isFixed={true}
          center={spot.location}
          zoomLevel={17}
          style={{ height: '250px' }}
        />
        <SpotInfo>
          <p>{spot.name}</p>
          {spot.location.address && <p>{spot.location.address}</p>}
        </SpotInfo>
      </Header>

      <Body>
        <AuthoredBy>
          Added by <span>{spot.author.username}</span>
        </AuthoredBy>
        {spot.description && <Markdown>{spot.description}</Markdown>}
      </Body>

      <Comments>
        {spot.comments.map(comment => (
          <li key={comment.id}>
            <Comment>
              <CommentHeader>
                {comment.author.username} wrote on{' '}
                {format(comment.createdAt.toString(), 'DD/MM/YYYY')}
              </CommentHeader>
              <Markdown>{comment.body}</Markdown>
            </Comment>
          </li>
        ))}
      </Comments>

      <AddComment onSave={createComment} />
    </main>
  )
}
