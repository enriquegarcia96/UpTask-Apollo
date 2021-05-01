import 'react-native-gesture-handler';
import React from 'react';

import { Root } from 'native-base';

import { StyleSheet, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';


import CrearCuenta from './views/CrearCuenta';
import Login from './views/Login';


const Stack = createStackNavigator();

const App =()  => {
  

  return (
    <>
      <Root>
        <NavigationContainer>
          <Stack.Navigator
            initialRouteName='Login'
          >
            <Stack.Screen 
              name='Login'
              component={Login}
              options={{
                title: 'Iniciar Sesión',
                headerShown: false, // para quitar la barra
              }}
            />

            <Stack.Screen
              name='CrearCuenta'
              component={CrearCuenta}
              options={{
                title: 'Crear Cuenta',
                headerStyle:{
                  backgroundColor: '#28303B'
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />


          </Stack.Navigator>
        </NavigationContainer>
      </Root>
    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
