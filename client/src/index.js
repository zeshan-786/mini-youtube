import React from "react";
import ReactDOM from "react-dom";
import "./index.css";

import App from "./App.js";
import { ApolloClient, ApolloLink } from "@apollo/client";
import { createUploadLink } from "apollo-upload-client";
import { ApolloProvider } from "@apollo/react-hooks";
import { InMemoryCache } from "apollo-cache-inmemory";
import { onError } from "@apollo/client/link/error";

import fetch from 'isomorphic-fetch'

// const httpLink = createUploadLink({
//   uri: "http://localhost:5000/graphql",
// });


// const client = new ApolloClient({
//   link: createUploadLink({
//       uri: 'http://localhost:5000/graphql',
//     }),
//   cache: new InMemoryCache(),
// });

const client = new ApolloClient({
  link:  ApolloLink.from([
    createUploadLink({
      uri: 'http://localhost:5000/graphql',
      fetch,
    }),
  ]),
  cache: new InMemoryCache(),
});


onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      console.log(
        `[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
      )
    );

  if (networkError) console.log(`[Network error]: ${networkError}`);
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
);
