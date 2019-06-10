import { Resolver } from 'awilix'
import { ApolloClient } from 'apollo-boost'

import { GraphQlService } from '../infrastructure/services/Graphql'
import { AuthService } from '../infrastructure/services/AuthService'
import { Cache } from '../infrastructure/services/Cache'
import { HttpService } from '../infrastructure/services/HttpService'
import { OnCommentAdded } from '../infrastructure/events/OnCommentAdded'
import { SpotRepository } from '../domain/repository/SpotRepository'
import { CommentRepository } from '../domain/repository/CommentRepository'
import { GetSpot } from '../domain/usecase/GetSpot'
import { SearchSpots } from '../domain/usecase/SearchSpots'
import { CreateSpot } from '../domain/usecase/CreateSpot'
import { AddComment } from '../domain/usecase/AddComment'
import { EventDispatcher, AppEventListener } from '../domain/events/Dispatcher'

export interface DiContainer {
  // Configuration
  apiUrl: Resolver<string>
  apollo: Resolver<ApolloClient<any>>

  // Events
  eventDispatcher: Resolver<EventDispatcher>
  onCommentAdded: Resolver<AppEventListener>

  // Services
  httpService: Resolver<HttpService>
  graphqlService: Resolver<GraphQlService>
  baseAuthService: Resolver<AuthService>
  authService: Resolver<AuthService>
  cache: Resolver<Cache>

  // Repositories
  spotRepository: Resolver<SpotRepository>
  commentRepository: Resolver<CommentRepository>

  // Use case
  getSpot: Resolver<GetSpot>
  searchSpots: Resolver<SearchSpots>
  createSpot: Resolver<CreateSpot>
  addComment: Resolver<AddComment>
}

export type DependencyKey = keyof DiContainer

export type GetDependencyType<
  T extends DependencyKey
> = DiContainer[T] extends Resolver<infer U> ? U : never
