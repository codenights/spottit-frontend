import ApolloClient from "apollo-boost";

import { AuthService } from "./AuthService";
import { GraphQlService } from "./Graphql";

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
    return this.client
      .query<Response, Variables>({
        query,
        variables,
        context: {
          headers: this.getHeaders()
        }
      })
      .then(response => response.data);
  }

  public mutate<Variables extends {}, Response>(
    mutation: any,
    variables: Variables
  ): Promise<Response> {
    return this.client.mutate<Response, Variables>({
      mutation,
      variables,
      context: {
        headers: this.getHeaders()
      }
    });
  }

  private getHeaders() {
    const { accessToken } = this.authService.getTokens();
    const headers: any = {};

    if (accessToken) {
      headers.Authorization = `Bearer ${accessToken}`;
    }

    return headers;
  }
}
