import React, { useState } from 'react';
import { Container, Button, H1, Form, Text, Item, Input, Toast } from 'native-base';
import globalStyles from '../styles/global';
import { useNavigation } from '@react-navigation/native';
import { View } from 'react-native';
import { gql, useMutation } from '@apollo/client';


const NUEVO_PROYECTO = gql`

    mutation nuevoProyecto($input: ProyectoInput) {
        nuevoProyecto(input : $input) {
            nombre
            id
        }
    }

`;

//.- Actualizar el cache .-//
const OBTENER_PROYECTOS = gql`

    query obtenerProyectos {
        obtenerProyectos {
            id
            nombre
        }
    }

`;


const NuevoProyecto = () => {
    
    //.- State del componente .-//
    const [ mensaje, guardarMensaje ] = useState(null);
    const [ nombre, guardarNombre ] = useState('');


    
    const navigation = useNavigation();
    

    //.- Apollo .-//
    const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
        update(cache, { data: { nuevoProyecto }}) {

            //.- actualiza los proyectos cuando se agregan nuevos .-//
            const { obtenerProyectos } = cache.readQuery({ query: OBTENER_PROYECTOS });
            cache.writeQuery({
                query: OBTENER_PROYECTOS,
                data: { obtenerProyectos: obtenerProyectos.concat([nuevoProyecto]) }
            })
        }
    });



    //.- Validar crear proyecto .-//
    const handleSubmit = async () => {

        if (nombre === '') {
            guardarMensaje('El nombre del proyecto es obligatorio');
            return
        }



        //.- guardar el proyecto en la base de datos .-//
        try {
            const { data } = await nuevoProyecto({
                variables: {
                    input:{
                        nombre
                    }
                }
            });

            //console.log(data);
            guardarMensaje('Proyecto Creado Correctamente');
            navigation.navigate('Proyectos');

        } catch (error) {
            //console.log(error);
            guardarMensaje(error.message.replace('GraphQL error: ', ''))
        }
    }


    //.- Muestra un mensaje Toast .-//
    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 4000
        })
    }




    return (

        <Container style={[ globalStyles.contenedor ], { backgroundColor: '#E84347' }}>
            <View style={ globalStyles.contenido } >
                <H1 style={ globalStyles.subtitulo } >Nuevo Proyecto</H1>

                <Form>
                    <Item inlineLabel last style={ globalStyles.input } >
                        <Input 
                            placeholder='Nombre del proyecto'
                            onChangeText={ texto => guardarNombre(texto) }
                        />
                    </Item>

                </Form>

                <Button
                    style={ [globalStyles.boton , { marginTop: 30 }] }
                    square
                    block
                    onPress={ () => handleSubmit() }
                >
                <Text style={ globalStyles.botonTexto } >Crear Proyecto</Text>
            </Button>
            </View>

            {mensaje && mostrarAlerta()}
        
        </Container>
    )
}

export default NuevoProyecto
