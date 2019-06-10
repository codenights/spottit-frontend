import { createContainer, asClass, asValue, asFunction } from 'awilix'
import ApolloClient from 'apollo-boost'

import { GetSpot } from '../domain/usecase/GetSpot'
import { SearchSpots } from '../domain/usecase/SearchSpots'
import { CreateSpot } from '../domain/usecase/CreateSpot'
import { AddComment } from '../domain/usecase/AddComment'
import { SpotRepositoryGql } from '../infrastructure/repository/SpotRepositoryGql'
import { CommentRepositoryGql } from '../infrastructure/repository/CommentRepositoryGql'
import { CacheLocalStorage } from '../infrastructure/services/CacheLocalStorage'
import { GraphQlApolloService } from '../infrastructure/services/GraphqlApollo'
import { BaseAuthService } from '../infrastructure/services/BaseAuthService'
import { CachedAuthService } from '../infrastructure/services/CachedAuthService'
import { FetchHttpService } from '../infrastructure/services/FetchHttpService'

import { DiContainer } from './types'
import { EventDispatcher } from '../domain/events/Dispatcher'
import { OnCommentAdded } from '../infrastructure/events/OnCommentAdded'

const apiUrl = process.env.REACT_APP_API_URL

if (!apiUrl) {
  throw new Error(
    'Environment variable process.env.REACT_APP_API_URL is required'
  )
}

export const container = createContainer()

const apollo = new ApolloClient({
  uri: `${apiUrl}/graphql`,
})

const dependencies: DiContainer = {
  // Configuration
  apiUrl: asValue(apiUrl),
  apollo: asValue(apollo),

  // Events
  eventDispatcher: asClass(EventDispatcher).singleton(),
  onCommentAdded: asFunction(OnCommentAdded).singleton(),

  // Services
  httpService: asClass(FetchHttpService).singleton(),
  graphqlService: asClass(GraphQlApolloService).singleton(),
  baseAuthService: asClass(BaseAuthService).singleton(),
  authService: asClass(CachedAuthService).singleton(),
  cache: asClass(CacheLocalStorage).singleton(),

  // Repositories
  spotRepository: asClass(SpotRepositoryGql).singleton(),
  commentRepository: asClass(CommentRepositoryGql).singleton(),

  // Use cases
  getSpot: asClass(GetSpot).singleton(),
  searchSpots: asClass(SearchSpots).singleton(),
  createSpot: asClass(CreateSpot).singleton(),
  addComment: asClass(AddComment).singleton(),
}

container.register(dependencies as any)

export * from './Provider'
export * from './hooks'
