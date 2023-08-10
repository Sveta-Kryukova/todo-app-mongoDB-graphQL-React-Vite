//  ./client/src/main.tsx
import React from 'react'
import ReactDOM from 'react-dom/client'
import {ApolloClient, InMemoryCache, ApolloProvider} from '@apollo/client'
import App from './App.tsx'
import './index.scss'

const client = new ApolloClient({
  uri: 'http://localhost:5000/graphql',
  cache: new InMemoryCache(),
})


ReactDOM.createRoot(document.getElementById('root')!).render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>
)
