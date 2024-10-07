import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './constants/RootStackParamList';
import { ActivityIndicator } from "react-native";
import { initializeFirebase } from "./api/firebase.service";

import Inicio from './screens/Inicio';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import ProductsLayout from './screens/ProductLayout';
import ProductCard from './screens/ProductCard';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import Rewards from './screens/Rewards';

const Stack = createStackNavigator<RootStackParamList>();

export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false);

  useEffect(() => {
    const Initialize = async () => {
      try {
        await initializeFirebase();
        setFirebaseInitialized(true);
      } catch (error) {
        console.error(error);
      }
    }
    Initialize().then(r => console.log("Firebase Initialized"));
  }, [])

  if (!firebaseInitialized) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
        <Stack.Screen name="Register" component={Register}  options={{ headerShown: false }} />
        <Stack.Screen name="Login" component={Login}  options={{ headerShown: false }} />
        <Stack.Screen name="ProductsLayout" component={ProductsLayout} />
        <Stack.Screen name="ProductCard" component={ProductCard} />
        <Stack.Screen name="Cart" component={Cart} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Rewards" component={Rewards} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}


