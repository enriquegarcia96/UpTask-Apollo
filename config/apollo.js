import { ApolloClient } from '@apollo/client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { createHttpLink } from 'apollo-link-http';


import AsyncStorage from '@react-native-community/async-storage';
import { setContext } from 'apollo-link-context';



const httpLink = createHttpLink({

    // la URL donde se va a conectar a heroku
    uri: 'https://still-tundra-30789.herokuapp.com/'
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