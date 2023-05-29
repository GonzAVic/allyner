import {
  ApolloClient,
  InMemoryCache,
  ApolloLink,
  HttpLink,
} from "@apollo/client";

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

const httpLink = new HttpLink({
  uri: `https://allyner-api-dev.herokuapp.com/graphql`,
});

const authLink = new ApolloLink((operation, forward) => {
  // Retrieve the authorization token from local storage.
  const token =
    "eyJhY2Nlc3MtdG9rZW4iOiJZdjlqYlVXZ2xqdlhZdTh6bXBxMHZBIiwidG9rZW4tdHlwZSI6IkJlYXJlciIsImNsaWVudCI6IlNHQUp6Zm5jc0IwM2taVE5GYUtMbGciLCJleHBpcnkiOiIyMDAwOTU5ODgyIiwidWlkIjoibmdrbXNkZm5oamtuQGdtYWlsLmNvbSJ9";

  // Use the setContext method to set the HTTP headers.
  operation.setContext({
    headers: {
      authorization: token ? `Bearer ${token}` : "",
    },
  });

  // Call the next link in the middleware chain.
  return forward(operation);
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: authLink.concat(httpLink),
  defaultOptions,
});

export { client };
