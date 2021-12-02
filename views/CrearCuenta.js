import React from 'react';
import {View} from 'react-native';
import { Container, Button, Text, Input, Form, Item, Toast, H1} from 'native-base';
import {useNavigation} from '@react-navigation/native'
import globalStyles from '../styles/global';

const CrearCuenta = () => {

    //React navigation
    const navigation = useNavigation();
    return ( 
       <Container style={[globalStyles.contenedor, {backgroundColor:'#e84347'}]}>
           <View style={globalStyles.contenido}>
               <H1 style={globalStyles.titulo}>Uptask</H1>

               <Form>
                    <Item inlineLabel last style={globalStyles.input}>
                       <Input
                        placeholder="Nombre"
                       />
                   </Item>
                   <Item inlineLabel last style={globalStyles.input}>
                       <Input
                        placeholder="Email"
                       />
                   </Item>
                   <Item inlineLabel last style={globalStyles.input}>
                       <Input
                        secureTextEntry={true}
                        placeholder="Password"
                       />
                   </Item>
               </Form>

               <Button
                square
                block
                style={globalStyles.boton}
               >
                   <Text
                    style={globalStyles.botonTexto}
                   >Crear Cuenta</Text>
               </Button>
           </View>
       </Container>

     );
}
 
export default CrearCuenta;