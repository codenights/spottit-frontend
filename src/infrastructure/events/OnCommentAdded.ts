import { ApolloClient } from 'apollo-boost'

import { AppEventListener } from '../../domain/events/Dispatcher'

import { queries } from '../repository/SpotRepositoryGql'
import {
  FetchSpot,
  FetchSpotVariables,
} from '../repository/queries/__generated__/FetchSpot'

export interface Dependencies {
  apollo: ApolloClient<any>
}

export const OnCommentAdded = ({
  apollo,
}: Dependencies): AppEventListener => event => {
  if (event.type === 'comment_added') {
    const data = apollo.cache.readQuery<FetchSpot, FetchSpotVariables>({
      query: queries.SPOT,
      variables: {
        id: event.comment.spotId,
      },
    })

    if (!data) {
      return
    }

    data.spot.comments.push({
      __typename: 'Comment',
      author: {
        __typename: 'User',
        id: event.comment.author.id,
        username: event.comment.author.username,
      },
      body: event.comment.body,
      createdAt: event.comment.createdAt,
      id: event.comment.id,
    })

    apollo.cache.writeQuery({
      query: queries.SPOT,
      data,
    })
  }
}
