import React from 'react'
import { Text, ListItem, Left, Right, Icon, Toast } from 'native-base';
import { StyleSheet, Alert } from 'react-native';
import { gql, useMutation } from '@apollo/client';



const ACTUALIZAR_TAREA = gql`

    mutation actualizarTarea( $id: ID!, $input: TareaInput, $estado: Boolean ){
        actualizarTarea(id: $id, input: $input, estado: $estado) {
            nombre
            id
            proyecto
            estado
        }
    }

`;


const ELIMINAR_TAREA = gql`

    mutation eliminarTarea($id: ID!) {
        eliminarTarea(id: $id)
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




const Tarea = ({tarea, proyectoId}) => {

    //.- Apollo .-//
    const [actualizarTarea] = useMutation(ACTUALIZAR_TAREA);
    const [eliminarTarea] = useMutation(ELIMINAR_TAREA, {
        update(cache) {

            //.- Obtiene las Tareas .-//
            const { obtenerTareas } = cache.readQuery({
                query: OBTENER_TAREAS,
                variables: {
                    input: {
                        proyecto: proyectoId
                    }
                }
            });


            //.- Reescribe el cache .-//
            cache.writeQuery({
                query: OBTENER_TAREAS,
                variables:{
                    input: {
                        proyecto: proyectoId
                    }
                },

                //.- data lo voy a reescribir .-//
                data:{
                    obtenerTareas: obtenerTareas.filter( tareaActual => tareaActual.id !== tarea.id )//mantela en el cache
                }
            });
        }
    });


    //.- cambia el estado de una tarea a completo o incompleto .-//
    const cambiarEstado = async () => {

        //.- obtener el id de la tarea .-//
        const { id } = tarea;

        //console.log(!tarea.estado);

        try {
            const { data } =  await actualizarTarea({
                variables: {
                    id,
                    input:{
                        nombre: tarea.nombre
                    },
                    estado: !tarea.estado
                }
            });

            console.log(data)

        } catch (error) {
            console.log(error);
        }

    }



    //.- dialogo para eliminar o no una tarea .-//
    const mostrarEliminar = () => {
        Alert.alert('Eliminar Tarea', '¿Deseas Eliminar esta tarea?',
        [
            {
                text: 'Cancelar',
                styles: 'cancel'
            },
            {
                text: 'Confirmar',
                onPress: () => eliminarTareaDB()
            }
        ])
    }

    //.- Eliminar Tarea de la Base de datos .-//
    const eliminarTareaDB =  async () =>{

        const { id } = tarea;

        try {

            const {data } = await eliminarTarea({
                variables: {
                    id
                }
            });

            console.log(data);
            
        } catch (error) {
            console.log(error)
        }
    }



    return (
      <>

        <ListItem
            onPress={() => cambiarEstado()}
            onLongPress={ () => mostrarEliminar() }
        >
            <Left>
                <Text>{tarea.nombre}</Text>
            </Left>

            <Right>

                {/** CAMBIA DE COLOR EL ICONO  */}
                { tarea.estado ? (
                    <Icon 
                        style={[styles.icono, styles.completo]}
                        name='ios-checkmark-circle' 
                    />
                ) : (
                    <Icon 
                        style={[styles.icono,  styles.incompleto]}
                        name='ios-checkmark-circle' 
                    />
                )}
            </Right>
        </ListItem>

      </>  
    );
}



const styles  = StyleSheet.create({

    icono:{
        fontSize: 32,
    },
    completo:{
        color: 'green'
    },
    incompleto:{
        color: '#E1E1E1'
    }

})




export default Tarea
