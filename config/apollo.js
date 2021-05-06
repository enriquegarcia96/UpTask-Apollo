import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';

import { Platform } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from 'apollo-link-context';



const httpLink = createHttpLink({

    // la URL donde se va a conectar
    uri: Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.33.106:4000/'
})


const authLink = setContext( async (_, { headers }) => {

    //.- leer el token .-//
    const token  = await AsyncStorage.getItem('token');

    return {
        headers:{
            ...headers,
            authorization: token ? `Bearer ${token}` : ''

        }
    }

} )


const client = new ApolloClient({

    cache: new InMemoryCache(),
    link: authLink.concat(httpLink)
    
});



export default client;