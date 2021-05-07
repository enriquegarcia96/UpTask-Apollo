import React, { useState } from 'react'
import { View } from 'react-native'

import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';


import globalStyles from '../styles/global';

import AsyncStorage from '@react-native-community/async-storage';


//Apollo
import { gql, useMutation } from '@apollo/client';


const AUTENTICAR_USUARIO = gql`
    mutation autenticarUsuario($input: AutenticarInput){
        autenticarUsuario(input: $input){
            token
        }        
    }
`;


const Login = () => {

    //.- state del Formulario .-//
    const [email, guardarEmail] = useState('');
    const [password, guardarPassword] = useState('');
    const [ mensaje, guardarMensajes  ] = useState(null);


    //.- React navigation .-/
    const navigation = useNavigation();


    //.- Mutation de Apollo .-//
    const [ autenticarUsuario ] = useMutation(AUTENTICAR_USUARIO);



    //.- cuando el usuario presione iniciar sesion .-//
    const handleSubmit = async () =>{

        //.- validar .-//
        if ( email.trim() === '' || password === '' ) {
            
            //.- mostrar un error .-//
            guardarMensajes('Todos los campos son obligatorios');
            return;
        }

        try {
            
            //.- Autenticar al usuario .-//
            const { data } = await autenticarUsuario({
                variables:{
                    input:{  
                        email,
                        password
                    }
                }
            })

            //console.log(data)

            const { token } = data.autenticarUsuario;

            //.- colocar el token en el storage .-//
            await AsyncStorage.setItem('token', token);


            //.- Redirrecionar a Proyectos .-//
            navigation.navigate('Proyectos');
            

        } catch (error) {
            guardarMensajes(error.message.replace('GraphQL error:', ''));
        }
    }



    //.- muestra un mensaje .-//
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 4000
        });
    }


    return (
        <Container style={[{ backgroundColor: '#f21170'}, globalStyles.contenedor ] }>
            <View style={ globalStyles.contenido }>
                <H1 style={ globalStyles.titulo } >Uptask</H1>
                <H1 style={ globalStyles.firma } >Enrique S. García</H1>

                <Form>
                    <Item inlineLabel last style={ globalStyles.input } >
                        <Input 
                            placeholder='Email'
                            keyboardType='email-address'
                            onChangeText={ texto => guardarEmail(texto.toLowerCase()) }
                            value={email}
                            
                        />
                    </Item>

                    <Item inlineLabel last style={ globalStyles.input } >
                        <Input 
                            secureTextEntry={true}
                            placeholder='Password'
                            onChangeText={ texto => guardarPassword(texto) }
                        />
                    </Item>
                </Form>

                <Button
                    square
                    block
                    style={ globalStyles.boton }
                    onPress={ () => handleSubmit() }
                >
                    <Text
                        style={ globalStyles.botonTexto }
                    >Iniciar Sesión</Text>
                </Button>

                <Text 
                    onPress={ () => navigation.navigate('CrearCuenta') }
                    style={ globalStyles.enlace } 
                >Crear Cuenta</Text>

                {mensaje && mostrarAlerta()}

            </View>
        </Container>
    )
}

export default Login
