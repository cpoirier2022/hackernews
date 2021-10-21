import React from 'react'
import ReactDOM from 'react-dom'
import './styles/index.css'
import App from './components/App'
//import registerServiceWorker from './registerServiceWorker'
import { ApolloProvider } from 'react-apollo'
import { ApolloClient } from 'apollo-client'
import { createHttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import { setContext } from 'apollo-link-context'

const httpLink = createHttpLink({
  uri: 'http://localhost:4000'
})
/*
const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache()
}) */

const authLink = setContext((_, { headers }) => {
  return {
    headers: {
      authorization: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjMsImlhdCI6MTYzMzM3OTIxMX0.HeuBGiu_2bwzIosaLK73693AbedF14EyCWpLo4KDAOg',
    }
  }
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache()
});

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById('root')
)
//registerServiceWorker()
