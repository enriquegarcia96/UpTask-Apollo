import 'react-native-gesture-handler';
import React from 'react';

import { StyleSheet,Text,View,} from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import CrearCuenta from './views/CrearCuenta';
import Login from './views/Login';


const Stack = createStackNavigator();

const App =()  => {
  

  return (
    <>
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
              name='Crear Cuenta'
              component={CrearCuenta}
              options={{
                title: 'Crear Cuenta'
              }}
            />


          </Stack.Navigator>
        </NavigationContainer>



    </>
  );
};

const styles = StyleSheet.create({
 
});

export default App;
