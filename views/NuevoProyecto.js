import React, {useState} from 'react';
import {View} from 'react-native';
import { Container, Text, H1, Form, Item, Input, Toast, Button} from 'native-base';
import globalStyles from '../styles/global';
import {useNavigation} from '@react-navigation/native';
import {gql, useMutation} from '@apollo/client';

 const NUEVO_PROYECTO = gql `
    mutation NuevoProyecto($input: ProyectoInput) {
        nuevoProyecto(input: $input) {
            nombre
            id
        }
    }
`;

//Actualizar el cache
const OBTENER_PROYECTOS = gql`
    query ObtenerProyectos {
        obtenerProyectos {
            nombre
            id
        }
    }
` 

const NuevoProyecto = () => {

    //navigation
    const navigation = useNavigation();

    //state del componente
    const [mensaje, guardarMensaje] = useState(null);
    const [nombre, guardarNombre] = useState('');

    //Apollo
     const [nuevoProyecto] = useMutation(NUEVO_PROYECTO, {
        update(cache, {data: {nuevoProyecto}}){
            const{obtenerProyectos} = cache.readQuery({query: OBTENER_PROYECTOS});
            cache.writeQuery({
                query:OBTENER_PROYECTOS,
                data:{obtenerProyectos: obtenerProyectos.concat([nuevoProyecto])}
            })
        }
    })
    //validar crear proyecto
    const handleSubmit = async () => {
        if (nombre === '') {
            guardarMensaje('El nombre del proyecto es obligatorio');
            return;
        }

        //Guardar el proyecto en la base de datos
        try {
            const {data} = await nuevoProyecto({
                variables: {
                    input: {
                        nombre
                    }
                }
            });
            //console.log(data);
            guardarMensaje('Proyecto Creado Correctamente');
            navigation.navigate('Proyectos');
        } catch (error) {
            //console.log(error);
            guardarMensaje(error.message);
        }
    }

    const mostrarAlerta = () => {
        Toast.show({
            text:mensaje,
            buttonText: 'OK',
            duration: 5000
        })
    }

    return ( 
        <Container style={[globalStyles.contenedor, {backgroundColor:'#e84347'}]}>
            
            <View style={globalStyles.contenido}>
                <H1 style={globalStyles.subtitulo}>Crea un Proyecto</H1>
                <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                        <Input
                            placeholder="Nombre del Proyecto"
                            onChangeText={texto => guardarNombre(texto)}
                            value={nombre}
                        />
                    </Item>
                </Form>

                <Button
                    style={[globalStyles.boton, {marginTop: 30}]}
                    square
                    block
                    onPress={() => handleSubmit()}
                >
                <Text style={globalStyles.botonTexto}>Crear Proyecto</Text>
                </Button>

                {mensaje && mostrarAlerta()}
            </View>
        </Container>
     );
}
 
export default NuevoProyecto;