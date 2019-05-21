export interface GraphQlService {
  query<Variables extends {}, Response>(
    query: any,
    variables: Variables
  ): Promise<Response>;

  mutate<Variables extends {}, Response>(
    mutation: any,
    variables: Variables
  ): Promise<Response>;
}
