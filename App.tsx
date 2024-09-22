import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Inicio from './classes/Inicio';
import Register from './classes/Register';
import Login from './classes/Login';
import Home from './classes/Home';

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



//     <View style={styles.container}>
//       <View style={styles.firstContainer}>
//         <Image 
//             source={require('./assets/redbamx_logo_sinfondo.png')} 
//             // style={styles.image}
//         />
//       </View>
//       <View style={styles.secondContainer}>
//         <Text style={styles.title}>
//           ¡Únete a la lucha contra el hambre!
//         </Text>
//         <Text style={styles.text}>
//           Cada donación marca la diferencia.
//           Ayuda a llevar alimentos a quienes
//           más lo necesitan y sé parte del
//           cambio. ¡Comienza hoy mismo!
//         </Text>
//         <View style={styles.button}>
//           <View style={{ borderRadius: 30, overflow: 'hidden' }}>
//             <Button
//               title="Empieza Aquí"
//               onPress={() => navigation.navigate('Registrate')}
//               color={'#f31f35'}
//             />
//           </View>
//         </View>
//       </View>
//     </View>
//   );
// }

// // Navigation and default vizualization
// export default function Navigation() {

//   return(
//     <NavigationContainer>
//       <Stack.Navigator>
//         <Stack.Screen 
//           name="INICIO"
//           component={App}
//         /> 
//         <Stack.Screen 
//           name="Registrate"
//           component={Register}
//         />
//       </Stack.Navigator>
//       {/* <View style={styles.footer}>
//         <Text style={styles.footerText}>some footer text</Text>
//       </View> */}
//     </NavigationContainer>
//   );
// }

// // Main View Styles
// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#0fa917',
//     // padding: 10,
//     // alignItems: 'center',
//     // justifyContent: 'space-around',
//   },
//   firstContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//     backgroundColor: '#0fa917',
//     padding: 45,
//   },
//   secondContainer: {
//     flex: 1,
//     justifyContent: 'space-around',
//     backgroundColor: '#ffffff',
//     padding: 25,
//     borderTopLeftRadius: 30,
//     borderTopRightRadius: 30,
//   },
//   footer: {
//     justifyContent: 'flex-end',
//     margin: 5,
//   },
//   footerText: {
//     fontSize: 10,
//   },
//   title: {
//     fontSize: 30,
//     textAlign: 'center',
//     fontWeight: 'bold',
//   },
//   text: {
//     fontSize: 18,
//     textAlign: 'center',
//     fontWeight: '200',
//   },
//   button: {
//     width: 150,
//     margin: 10,
//     alignSelf: 'flex-end',
//     borderRadius: 30,
//   },
// });