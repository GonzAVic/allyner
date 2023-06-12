import { ApolloClient, InMemoryCache } from "@apollo/client";

const defaultOptions = {
  watchQuery: {
    fetchPolicy: "no-cache",
    errorPolicy: "ignore",
  },
  query: {
    fetchPolicy: "no-cache",
    errorPolicy: "all",
  },
};

const host = process.env.NEXT_PUBLIC_HOST;

const client = new ApolloClient({
  uri: `${host}/api/graphql`,
  cache: new InMemoryCache(),
  defaultOptions,
});

export { client };