import 'react-native-gesture-handler';
import React from 'react';

import { Root } from 'native-base';

import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack';

import CrearCuenta from './views/CrearCuenta';
import Proyectos from './views/Proyectos';
import Login from './views/Login';
import NuevoProyecto from './views/NuevoProyecto';
import Proyecto from './views/Proyecto';


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

            <Stack.Screen 
              name='Proyectos'
              component={Proyectos}
              options={{
                title: 'Proyectos',
                headerStyle:{
                  backgroundColor: '#28303B'
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen 
              name='NuevoProyecto'
              component={NuevoProyecto}
              options={{
                title: 'Nuevo Proyecto',
                headerStyle:{
                  backgroundColor: '#28303B'
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              }}
            />

            <Stack.Screen 
              name='Proyecto'
              component={Proyecto}
              options={ ({ route }) => ( {

                //titulos dinamicos que viene de la base de datos
                title: route.params.nombre,//para que aparezca el titulo con el nombre del proyecto
                headerStyle:{
                  backgroundColor: '#28303B'
                },
                headerTintColor: '#FFF',
                headerTitleStyle: {
                  fontWeight: 'bold'
                }
              })}
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
