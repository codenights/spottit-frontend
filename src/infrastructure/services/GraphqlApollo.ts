import ApolloClient from "apollo-boost";

import { AuthService } from "./AuthService";
import { GraphQlService } from "./Graphql";
import { HttpService } from "./HttpService";

interface Dependencies {
  apiUrl: string;
  authService: AuthService;
}

export class GraphQlApolloService implements GraphQlService {
  private client: ApolloClient<any>;
  private authService: AuthService;

  public constructor({ apiUrl, authService }: Dependencies) {
    this.authService = authService;
    this.client = new ApolloClient({
      uri: `${apiUrl}/graphql`
    });
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
            headers: this.getHeaders()
          }
        })
        .then(response => response.data)
    );
  }

  public mutate<Variables extends {}, Response>(
    mutation: any,
    variables: Variables
  ): Promise<Response> {
    return this.retryIfNeeded(() =>
      this.client.mutate<Response, Variables>({
        mutation,
        variables,
        context: {
          headers: this.getHeaders()
        }
      })
    );
  }

  private getHeaders() {
    const { accessToken } = this.authService.getTokens();
    const headers: any = {};

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }

  private async retryIfNeeded<T>(doRequest: () => Promise<T>): Promise<T> {
    let retriesLeft = 1;
    let response: T;

    do {
      try {
        response = await doRequest();

        return response;
      } catch (err) {
        if (err.networkError && err.networkError.statusCode) {
          await this.authService.refreshTokens();

          retriesLeft -= 1;
        } else {
          throw err;
        }
      }
    } while (retriesLeft >= 0);

    throw new Error("Could not do stuff");
  }
}
