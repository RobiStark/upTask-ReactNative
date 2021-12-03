import {ApolloClient, InMemoryCache} from "@apollo/client";

import { Platform } from "react-native";

const uri = Platform.OS === 'ios' ? 'http://localhost:4000/' : 'http://10.0.2.2:4000/'

const client = new ApolloClient({
    uri: uri,
    //uri: 'http://10.0.2.2:4000/',
    cache: new InMemoryCache()
  });


export default client;