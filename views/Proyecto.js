import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { Text, Container, Button, H2, H1, Form, Item, Input, Toast, Content, List } from 'native-base';
import globalStyles from '../styles/global';
import { gql, useMutation, useQuery } from '@apollo/client';


import Tarea from '../components/Tarea';

//.- crear nuevas tareas .-//
const NUEVA_TAREA = gql`

   mutation nuevaTarea($input: TareaInput){
       nuevaTarea(input: $input){
           nombre
           id
           proyecto
           estado
       }
   }

`;



//.- Consulta las Tareas del proyecto .-//
const OBTENER_TAREAS = gql`

   query obtenerTareas($input: ProyectoIDInput) {
        obtenerTareas(input: $input){
            id
            nombre
            estado
        }
   }

`;




const Proyecto = ({ route }) => {

    //console.log(route.params)

    //.- obtiene el ID del proyecto .-//
    const { id } = route.params;


    //.- state del componente.-//
    const [nombre, guardarNombre] = useState('');
    const [mensaje, guardarMensaje] = useState(null);


    //.- apollo obtener tareas .-//
    const { data, loading, error } = useQuery(OBTENER_TAREAS, {
        variables:{
            input:{
                proyecto: id
            }
        }
    });

    //.- Apollo crear tareas .-//
    const [nuevaTarea] = useMutation(NUEVA_TAREA,{
        update(cache, { data: {nuevaTarea}}){

            //.- Obtengo el cache .-//
            const { obtenerTareas } = cache.readQuery({
                query: OBTENER_TAREAS, 

                //le especifico las variables
                variables:{

                    input:{
                        proyecto: id
                    }

                }
            });

            //.- reescribo el cache.-//
            cache.writeQuery({
                query: OBTENER_TAREAS,
                variables:{
                    input:{
                        proyecto: id
                    }
                },
                data: {

                    //.- toma el arreglo actual y le va a ensimar el nuevo objeto .-//
                    obtenerTareas: [...obtenerTareas, nuevaTarea]
                }
            })
        }
    });



    //.- Validar  y crear Tareas .-//
    const handleSubmit = async () => {

        if (nombre === '') {
            guardarMensaje(' El nombre de la tarea es obligatorio');
        }


        //.- almacenarlo en la base de datos .-//
        try {
            
            const { data } = await nuevaTarea({
                variables:{

                    //* depende de que variables acepte mi resolver es lo que le voy a enviar
                    input: {
                        nombre,
                        proyecto: id
                    }
                }
            });

            console.log(data);
            guardarNombre('');
            guardarMensaje('Tarea Creada Correctamente');
            
            setTimeout(() => {
                guardarMensaje(null);
            }, 3000);

        } catch (error) {
            console.log(error);
        }

    }

    const mostrarAlerta = () => {
        Toast.show({
            text: mensaje,
            buttonText: 'OK',
            duration: 5000
        })
    }



    //.- si apollo esta consultando .-//
    if (loading ) return <Text>Cargando...</Text>


    return ( 
        <Container style={[ globalStyles.contenedor ], {backgroundColor: '#E84347'}} >
            <Form style={{ marginHorizontal: '2.5%', marginTop: 20 }}>
                <Item inlineLabel last style={ globalStyles.input } >
                    <Input 
                        placeholder='Nombre Tarea'
                        value={nombre}
                        onChangeText={ texto => guardarNombre(texto) }
                    />
                </Item>
                <Button
                    style={ globalStyles.boton }
                    square
                    block
                    onPress={ () => handleSubmit() }
                >
                    <Text>Crear Tarea</Text>
                </Button>
            </Form>
            <H2 style={globalStyles.subtitulo} >Tareas: {route.params.nombre}</H2>

            <Content>
                <List style={styles.contenido}>
                        { data.obtenerTareas.map(tarea => (
                            <Tarea 
                                key={tarea.id}
                                tarea={tarea}
                                proyectoId={id}
                            />
                        )) }
                </List>
            </Content>

            {mensaje && mostrarAlerta()}
        </Container>
     )
}




const styles = StyleSheet.create({

    contenido:{
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%'
    }

})



export default Proyecto
