import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { RootStackParamList } from './constants/RootStackParamList';
import { ActivityIndicator } from "react-native";
import { initializeFirebase } from "./api/firebase.service";
import { CartProvider } from "./context/CartContex";

import Inicio from './screens/Inicio';
import Register from './screens/Register';
import Login from './screens/Login';
import Home from './screens/Home';
import Donaciones from "./screens/Donaciones";
import ProductCard from './screens/ProductCard';
import Cart from './screens/Cart';
import Profile from './screens/Profile';
import Rewards from './screens/Rewards';
import ConfProfile from './screens/ConfProfile';
import ConfPassword from './screens/ConfPassword';
import ConfNotification from './screens/ConfNotification';
import Reviews from './screens/Reviews';
import Help from './screens/Help';

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
      <CartProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Inicio" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Inicio" component={Inicio} options={{ headerShown: false }} />
            <Stack.Screen name="Home" component={Home}  options={{ headerShown: false }} />
            <Stack.Screen name="Register" component={Register}  options={{ headerShown: false }} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Donaciones" component={Donaciones} />
            <Stack.Screen name="ProductCard" component={ProductCard} />
            <Stack.Screen name="Cart" component={Cart} />
            <Stack.Screen name="Profile" component={Profile} />
            <Stack.Screen name="Rewards" component={Rewards} />
            <Stack.Screen name="ConfProfile" component={ConfProfile} />
            <Stack.Screen name="ConfPassword" component={ConfPassword} />
            <Stack.Screen name="ConfNotification" component={ConfNotification} />
            <Stack.Screen name="Reviews" component={Reviews} />
            <Stack.Screen name="Help" component={Help} />
          </Stack.Navigator>
        </NavigationContainer>
      </CartProvider>
  );
}


