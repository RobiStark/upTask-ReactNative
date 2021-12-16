import 'react-native-gesture-handler';
import React from 'react';
import {Root} from 'native-base'

import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();

import Login from './views/Login';
import Crearcuenta from './views/CrearCuenta';
import Proyectos from './views/Proyectos';
import NuevoProyecto from './views/NuevoProyecto';


const App = () => {

  return (
    <>
    <Root>
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

            <Stack.Screen
            name="Proyectos"
            component={Proyectos}
            options={{
              title:"Proyectos",
              headerStyle:{
                backgroundColor: '#28303B'
              },
              headerTintColor:'#fff',
              headerTitleStyle:{
                fontWeight:'bold'
              }
            }}
          />

          <Stack.Screen
            name="NuevoProyecto"
            component={NuevoProyecto}
            options={{
              title:"Nuevo Proyecto",
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
      </Root>
    </>
  )

  }
    

export default App;
