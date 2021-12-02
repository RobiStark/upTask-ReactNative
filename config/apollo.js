import {ApolloClient, InMemoryCache} from '@apollo/client';
//import { InMemoryCache} from 'apollo-cache-inmemory';
import { HttpLink }from 'apollo-link-http';

const client = new ApolloClient({
    uri: 'http://localhost:4000/',
    cache: new InMemoryCache()
    
})

export default client;