import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { HttpLink } from 'apollo-link-http';

import { Platform } from 'react-native';


// la URL donde se va a conectar
const uri = Platform.OS === 'ios' ? 'http://localhost:4000' : 'http://192.168.33.106:4000/';




const client = new ApolloClient({

    cache: new InMemoryCache(),
    link: new HttpLink({
        uri  // la URL donde se va a conectar
    })    
    
});



export default client;