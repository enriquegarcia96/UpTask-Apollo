import React, { useState } from 'react'
import { View } from 'react-native'

import { Container, Button, Text, H1, Input, Form, Item, Toast } from 'native-base';
import { useNavigation } from '@react-navigation/native';

//APollo
import { gql,useMutation } from '@apollo/client';



import globalStyles from '../styles/global';


const NUEVA_CUENTA = gql`

    mutation crearUsuario($input: UsuarioInput){
        crearUsuario(input : $input)
    }

`;


const CrearCuenta = () => {

    //.- React navigation .-/
    const navigation = useNavigation(NUEVA_CUENTA);


    //.- state del Formulario .-//
    const [nombre, guardarNombre] = useState('');
    const [email, guardarEmail] = useState('');
    const [password, guardarPassword] = useState('');
    const [ mensaje, guardarMensajes  ] = useState(null);



    //.-  Mutation de apollo  .-//
    const [ crearUsuario ] = useMutation(NUEVA_CUENTA);





    //.- Cuando el usuario presiona en crear cuenta .-//
    const handleSubmit = async () => {

        //.- validar .-//
        if (nombre === '' || email === '' || password === '' ) {
            
            //.-  mostrar un error .-// 
            guardarMensajes('Todos los campos son obligatorios');
            return
        }

        //.- passwors al menos 6 caracteres .-//
        if (password.length < 6) {
            guardarMensajes('La Contraseña debe de tener al menos 6 caracteres');
            return
        }


        //.- guadar el usuario .-//
        try {

            //data => es la respuesta del servidor
            const { data } = await crearUsuario({

                variables: {
                    input:{
                        nombre,
                        email,
                        password
                    }
                }
            })

            guardarMensajes(data.crearUsuario);
            navigation.navigate('Login');
            
        } catch (error) {
            guardarMensajes(error.message.replace('GraphQL error:', ''));
        }
    }



    //.- muestra un mensaje toast .-//
    const mostrarAlerta = () =>{
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 4000
        })
    }





    return (
        <Container style={[{ backgroundColor: '#E84347'}, globalStyles.contenedor ] }>
            <View style={ globalStyles.contenido }>
                <H1 style={ globalStyles.titulo } >Uptask</H1>

                <Form>
                    <Item inlineLabel last style={ globalStyles.input } >
                        <Input 
                            placeholder='Nombre'
                            onChangeText={ texto => guardarNombre(texto) }

                        />
                    </Item>

                    <Item inlineLabel last style={ globalStyles.input } >
                        <Input 
                            placeholder='Email'
                            onChangeText={ texto => guardarEmail(texto) }
                            keyboardType='email-address'
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
                    >Crear Cuenta</Text>
                </Button>

                {mensaje && mostrarAlerta()}

            </View>
        </Container>
    )
}

export default CrearCuenta
