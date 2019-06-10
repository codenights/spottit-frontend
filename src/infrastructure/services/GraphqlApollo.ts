import ApolloClient from 'apollo-boost'

import { AuthService } from './AuthService'
import { GraphQlService } from './Graphql'

interface Dependencies {
  apollo: ApolloClient<any>
  authService: AuthService
}

export class GraphQlApolloService implements GraphQlService {
  private client: ApolloClient<any>
  private authService: AuthService

  public constructor({ apollo, authService }: Dependencies) {
    this.authService = authService
    this.client = apollo
  }

  public query<Variables extends {}, Response>(
    query: any,
    variables: Variables
  ): Promise<Response> {
    return this.retryIfNeeded(() =>
      this.client
        .query<Response, Variables>({
          query,
          variables,
          context: {
            headers: this.getHeaders(),
          },
        })
        .then(response => response.data)
    )
  }

  public mutate<Variables extends {}, Response>(
    mutation: any,
    variables: Variables
  ): Promise<Response> {
    return this.retryIfNeeded(() =>
      this.client
        .mutate<Response, Variables>({
          mutation,
          variables,
          context: {
            headers: this.getHeaders(),
          },
        })
        .then(response => response.data)
    )
  }

  private getHeaders() {
    const { accessToken } = this.authService.getTokens()
    const headers: any = {}

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`
    }

    return headers
  }

  private async retryIfNeeded<T>(doRequest: () => Promise<T>): Promise<T> {
    let retriesLeft = 1
    let response: T

    do {
      try {
        response = await doRequest()

        return response
      } catch (err) {
        if (err.networkError && err.networkError.statusCode) {
          await this.authService.refreshTokens()

          retriesLeft -= 1
        } else {
          throw err
        }
      }
    } while (retriesLeft >= 0)

    throw new Error('Could not do stuff')
  }
}
