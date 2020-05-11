import * as React from 'react'
import { Icon } from "react-native-elements";

import { NavigationContainer } from '@react-navigation/native'
// import {createBottomTabNavigator} from '@react-navigation/bottom-tabs'
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

import { createStackNavigator } from '@react-navigation/stack'


// tutorial 
import TutorialScreen from '../tutorial/Tutorial'

//index, login, register
import IndexScreen from '../index/Index'
import LoginScreen from '../index/Login'
import RegisterScreen from '../index/Register'

// cuenta
import MyAccountScreen from '../screens/Account/MyAccount'

// negocios
import CategoriasScreen from '../screens/Negocios/Categorias'
import NegociosScreen from '../screens/Negocios/Negocios'
import ProductosScreen from '../screens/Negocios/Productos'
import CarScreen from '../screens/Negocios/CarScreen'
import DetallesScreen from '../screens/Negocios/Detalles'

//Pedidos
import PedidosScreen from '../screens/Pedidos/Pedidos'

// Pedido Formulario
import PedidoScreen from '../screens/Pedido/Pedido'




const Tab = createMaterialBottomTabNavigator()
const Stack = createStackNavigator()


// function PedidoStack() {
//   return (
//       <Stack.Navigator  initialRouteName="Realizar Pedido" screenOptions={{headerTitleAlign: 'center', headerTintColor: '#0E134F', headerStyle: {height: 65}}}>
//           <Stack.Screen name="Realizar Pedido"component={PedidoScreen}/>
         
//       </Stack.Navigator>
//   )
// }
function NegociosStack() {
  return (
      <Stack.Navigator  initialRouteName="Categorias" screenOptions={{ headerShown: false }} >
          <Stack.Screen name="Categorias" component={CategoriasScreen}/>

          <Stack.Screen name="Realizar Pedido" component={PedidoScreen}/>
          
          <Stack.Screen name="Negocios" component={NegociosScreen}/>
          <Stack.Screen name="Productos" component={ProductosScreen}/>
          <Stack.Screen name="CarScreen" component={CarScreen}/>
          <Stack.Screen name="Detalles" component={DetallesScreen}/>

         
      </Stack.Navigator>
  )
}
function MyAccountStack() {
  return(
    <Tab.Navigator 
      initialRouteName="Mi cuenta"
      labelStyle={{ fontSize: 10 }}
      barStyle={{ backgroundColor: '#00a680' }}> 
        {/* <Tab.Screen name="Pedido" component={PedidoStack}
          options={{
              tabBarIcon:({color}) => (
                <Icon type="material" name="contact-phone" color={color} size={26} />  
              )
          }}/> */}
        <Tab.Screen name="Negocios" component={NegociosStack}
          options={{
              tabBarIcon:({color}) => (
                <Icon type="material" name="restaurant" color={color} size={26} />
              )
          }}/>
        <Tab.Screen name="Pedidos" component={PedidosScreen}
          options={{
              tabBarIcon:({color}) => (
                <Icon type="material" name="shop" color={color} size={26} />
              )
          }}/>
        <Tab.Screen name="Mi cuenta" component = {MyAccountScreen}
            options={{
                tabBarIcon:({color}) => (
                  <Icon type="material" name="person" color={color} size={26} /> 
                )
            }}
        />
    </Tab.Navigator>
  )
}

export default function Navigation() {
    return (
     <NavigationContainer>
        <Stack.Navigator 
          initialRouteName="Tutorial" 
          screenOptions={{ 
            title: 'Runsoco',
            headerStyle: { backgroundColor: '#00a680'}, 
            headerTintColor: '#fff', 
            headerTitleStyle: { fontWeight: 'bold'},
            headerTitleAlign: 'center',
          }}>  
          
            <Stack.Screen name="Tutorial" component={TutorialScreen}/>


            <Stack.Screen name="Index" component={IndexScreen} options={{ headerLeft: false}}/>
          
            <Stack.Screen name="Iniciar Sesión" component={LoginScreen} options={{ title: 'Iniciar Sesión' }}/>

            <Stack.Screen name="Regístrate" component={RegisterScreen} options={{ title: 'Regístrate' }}/>

            <Stack.Screen name="Mi cuenta" component={MyAccountStack} options={{headerLeft: false}}/>
          
        </Stack.Navigator>
      </NavigationContainer>
  )
}