import {ApolloClient, InMemoryCache, createHttpLink} from "@apollo/client";
import { setContext } from '@apollo/client/link/context';

import { Platform } from "react-native";

import AsyncStorage from '@react-native-async-storage/async-storage';

const httpLink = createHttpLink({
    uri: Platform.OS === 'ios' ? 'http://localhost:4000/' : 'http://10.0.2.2:4000/'
  });

  const authLink = setContext(async (_, { headers }) => {

        const token = await AsyncStorage.getItem('token');
        
        return{
            headers:{
                ...headers,
                authorization: token ? `Bearer ${token}` : ''
            }
        }
  })

const client = new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache()
  });


export default client;