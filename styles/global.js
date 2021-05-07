import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({

    contenedor: {
        flex: 1
    },
    contenido:{
        flexDirection: 'column',
        justifyContent: 'center',
        marginHorizontal: '2.5%',
        flex: 1
    },
    titulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontFamily:'Girassol-Regular' ,
        color: '#FFF'
    },
    subtitulo:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 26,
        fontWeight:'bold',
        color: '#FFF',
        marginTop: 20
    },
    input:{
        backgroundColor: '#FFF',
        marginBottom: 20,
        fontFamily: 'inputs'

    },
    boton:{
        backgroundColor: '#28303B',
        
    },
    botonTexto:{
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#FFF'
    },
    enlace:{
        color: '#FFF',
        marginTop: 60,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 18,
        textTransform: 'uppercase'
    },
    firma:{
        textAlign: 'center',
        marginBottom: 20,
        fontSize: 32,
        fontFamily:'Montserrat-ThinItalic' ,
        color: '#FFF'
    }

});

export default globalStyles;