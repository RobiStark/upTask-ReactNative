import 'react-native-gesture-handler';
import React from 'react';

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './views/Login';
import Crearcuenta from './views/CrearCuenta';


const App = () => {

  return (
    <>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Login"
            component={Login}
            options={{
              title:"Iniciar Sesión",
              headerShown: false
            }}
          />

          <Stack.Screen
            name="CrearCuenta"
            component={Crearcuenta}
            options={{
              title:"Crear Cuenta",
              headerStyle:{
                backgroundColor: '#28303B'
              },
              headerTintColor:'#fff',
              headerTitleStyle:{
                fontWeight:'bold'
              }
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  )

  }
    

export default App;
