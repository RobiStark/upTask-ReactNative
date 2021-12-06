import React, {useState} from 'react';
import {View} from 'react-native';
import { Container, Button, Text, Input, Form, Item, Toast, H1} from 'native-base';
import {useNavigation} from '@react-navigation/native'
import globalStyles from '../styles/global';
import AsyncStorage from '@react-native-async-storage/async-storage'

//Apollo
import {gql, useMutation} from '@apollo/client';

const AUTENTICAR_USUARIO = gql`
    mutation AutenticarUsuario($input: AutenticarInput) {
        autenticarUsuario(input: $input) {
        token
        }
    }
`

const Login = () => {
    //State el formulario
    const [email, guardarEmail] = useState('');
    const [password, guardarPassword] = useState('');

    const [mensaje, guardarMensaje] = useState(null);

    //React navigation
    const navigation = useNavigation();

    //Mutation de apollo
    const [autenticarUsuario] = useMutation(AUTENTICAR_USUARIO);

    //Cuando el usuario presiona iniciar sesion

    const handleSubmit = async () => {
         //validar
         if (email === '' || password === ''){
            //Mostrar un error
            guardarMensaje('Todos los campos son obligatorios')
            return;
        }

        try {
            //autenticar al usuario
            const {data} = await autenticarUsuario({
                variables:{
                    input:{
                        email,
                        password
                    }
                }
            });
            const {token} = data.autenticarUsuario
            //Colocar token en storage
            await AsyncStorage.setItem('token', token)
            //console.log(token);

            //Redireccionar a proyectos
            navigation.navigate('Proyectos');
        } catch (error) {
            //si hay un error mostrarlo
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
               <H1 style={globalStyles.titulo}>Uptask</H1>

               <Form>
                   <Item inlineLabel last style={globalStyles.input}>
                       <Input
                       autoCompleteType="email"
                        placeholder="Email"
                        onChangeText={texto => guardarEmail(texto)}
                       />
                   </Item>
                   <Item inlineLabel last style={globalStyles.input}>
                       <Input
                        secureTextEntry={true}
                        placeholder="Password"
                        onChangeText={texto => guardarPassword(texto)}
                       />
                   </Item>
               </Form>

               <Button
                square
                block
                style={globalStyles.boton}
                onPress={() => handleSubmit()}
               >
                   <Text
                    style={globalStyles.botonTexto}
                   >Iniciar Sesión</Text>
               </Button>
               
               <Text
                style={globalStyles.enlace}
                onPress={() => navigation.navigate("CrearCuenta")}
               >Crear Cuenta</Text>

                {mensaje && mostrarAlerta()}
           </View>
       </Container>

     );
}
 
export default Login;