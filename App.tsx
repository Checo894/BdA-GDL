import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './classes/Inicio';
import Register from './classes/Register';
import Login from './classes/Login';
import Home from './classes/Home';
// Import Firebase SDK
import { initializeApp } from 'firebase/app';
import { initializeAuth, getReactNativePersistence } from 'firebase/auth';
import ReactNativeAsyncStorage from '@react-native-async-storage/async-storage';
import Constants from 'expo-constants';

const firebaseConfig = {
  apiKey: Constants.expoConfig?.extra?.FIREBASE_API_KEY,
  authDomain: "TU_AUTH_DOMAIN",
  projectId: Constants.expoConfig?.extra?.PROJECT_ID,
  storageBucket: Constants.expoConfig?.extra?.STORAGE_BUCKET,
  messagingSenderId: Constants.expoConfig?.extra?.MESSAGING_SENDER_ID,
  appId: Constants.expoConfig?.extra?.MOBILDESK_APP_ID,
};

// Inicializa Firebase
const firebaseApp = initializeApp(firebaseConfig);

const auth = initializeAuth(firebaseApp, {
  persistence: getReactNativePersistence(ReactNativeAsyncStorage),
});

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Inicio">
        <Stack.Screen name="Inicio" component={Inicio} />
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Register" component={Register} />
        <Stack.Screen name="Login" component={Login} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}






// import React from 'react';
// import { NavigationContainer } from '@react-navigation/native';
// import { createStackNavigator } from '@react-navigation/stack';
// import Inicio from './classes/Inicio';
// import Register from './classes/Register';
// import Login from './classes/Login';
// import Home from './classes/Home';
// // Importar Firebase (sin inicialización manual)
// import auth from '@react-native-firebase/auth';

// const Stack = createStackNavigator();

// export default function App() {
//   return (
//     <NavigationContainer>
//       <Stack.Navigator initialRouteName="Inicio">
//         <Stack.Screen name="Inicio" component={Inicio} />
//         <Stack.Screen name="Home" component={Home} />
//         <Stack.Screen name="Register" component={Register} />
//         <Stack.Screen name="Login" component={Login} />
//       </Stack.Navigator>
//     </NavigationContainer>
//   );
// }
