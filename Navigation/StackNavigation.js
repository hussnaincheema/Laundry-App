import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/HomeScreen';
import PickUpScreen from '../Screens/PickUpScreen';
import CartScreen from '../Screens/CartScreen';
import OrderScreen from '../Screens/OrderScreen';
import AuthNavigation from "./AuthNavigation";

const StackNavigation = () => {

  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="PickUp" component={PickUpScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Cart" component={CartScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Profile" component={AuthNavigation} options={{ headerShown: false }} />
        <Stack.Screen name="Order" component={OrderScreen} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default StackNavigation;

const styles = StyleSheet.create({})