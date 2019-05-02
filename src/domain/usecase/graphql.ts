import ApolloClient from "apollo-boost";

export const graphql = new ApolloClient({
  uri: `${process.env.REACT_APP_API_URL}/graphql`
});
