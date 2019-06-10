import React, { useState } from 'react'
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
  AddComment,
  ButtonWrapper,
} from './styles'
import { Button } from '../../ui/Button'

export interface SpotDetailsProps {
  spotId: string
}

export const SpotDetails: React.FC<SpotDetailsProps> = ({ spotId }) => {
  const [spot, createComment] = useSpot(spotId)
  const [body, setBody] = useState('')

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

      <AddComment
        onSubmit={e => {
          e.preventDefault()
          createComment(body)
          setBody('')
        }}
      >
        <textarea
          placeholder="Write something about this spot..."
          value={body}
          onChange={e => setBody(e.target.value)}
        />
        <ButtonWrapper>
          <Button type="submit">Send</Button>
        </ButtonWrapper>
      </AddComment>
    </main>
  )
}
