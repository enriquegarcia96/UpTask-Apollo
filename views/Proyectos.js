import React from 'react'
import { View, StyleSheet } from 'react-native'
import { Container, Button, Text, H2, Content, ListItem, Left, Right, List } from 'native-base'
import globalStyles from '../styles/global';

import { gql, useQuery } from '@apollo/client';

import { useNavigation } from '@react-navigation/native';


const OBTENER_PROYECTOS = gql`

    query obtenerProyectos {
        obtenerProyectos {
            id
            nombre
        }
    }

`;


const Proyectos = () => {


    const navigation = useNavigation();


    //.- Apollo .-//
    const { data, loading, error } = useQuery(OBTENER_PROYECTOS);


    console.log(data);
    console.log(loading);
    console.log(error);



    if (loading) return <Text>Cargando...</Text>
    


    return (
        <Container style={[ globalStyles.contenedor ], { backgroundColor: '#E84347' }}>
            <Button
                style={ [globalStyles.boton , { marginTop: 30 }] }
                square
                block
                onPress={ () => navigation.navigate('NuevoProyecto') }
            >
                <Text style={ globalStyles.botonTexto } >Nuevo Proyecto</Text>
            </Button>

            <H2 style={ globalStyles.subtitulo } >Selecciona un proyecto</H2>

            <Content>

                {/** MUESTRO LOS PROYECTOS QUE HAY EN MONGO */}
                <List style={styles.contenido} >
                    {data.obtenerProyectos.map(proyecto => (
                            <ListItem
                                key={proyecto.id}
                                onPress={ () => navigation.navigate('Proyecto',proyecto) }
                            >
                                <Left>  
                                    <Text>{proyecto.nombre}</Text>
                                </Left>

                                <Right>

                                </Right>

                            </ListItem>
                    ))}

                </List>
            </Content>

        </Container>
    )
}


const styles = StyleSheet.create({

    contenido:{
        backgroundColor: '#FFF',
        marginHorizontal: '2.5%'
    }

})


export default Proyectos;
