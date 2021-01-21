
import client from '../config/apollo'
import { ApolloProvider } from '@apollo/client'

function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  ) 
}

export default MyApp
