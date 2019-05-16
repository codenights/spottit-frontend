import ApolloClient from "apollo-boost";

interface Dependencies {
  apiUrl: string;
}

export class GraphQlService {
  private client: ApolloClient<any>;

  public constructor({ apiUrl }: Dependencies) {
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
        variables
      })
      .then(response => response.data);
  }

  public mutate<Variables extends {}, Response>(
    mutation: any,
    variables: Variables
  ): Promise<Response> {
    return this.client.mutate<Response, Variables>({
      mutation,
      variables
    });
  }
}
