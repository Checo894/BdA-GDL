import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button, Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Register from './classes/Register';

const Stack = createNativeStackNavigator();

// Main view of the app
function App({navigation} : any) {

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <Image 
            source={require('./assets/redbamx_logo_sinfondo.png')} 
            // style={styles.image}
        />
      </View>
      <View style={styles.secondContainer}>
        <Text style={styles.title}>
          ¡Únete a la lucha contra el hambre!
        </Text>
        <Text style={styles.text}>
          Cada donación marca la diferencia.
          Ayuda a llevar alimentos a quienes
          más lo necesitan y sé parte del
          cambio. ¡Comienza hoy mismo!
        </Text>
        <View style={styles.button}>
          <Button
            title="Empieza Aquí"
            onPress={() => navigation.navigate('Registrate')}
            color={'#f31f35'}
          />
        </View>
      </View>
    </View>
  );
}

// Navigation and default vizualization
export default function Navigation() {

  return(
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
          name="INTRODUCCION"
          component={App}
        /> 
        <Stack.Screen 
          name="Registrate"
          component={Register}
        />
      </Stack.Navigator>
      {/* <View style={styles.footer}>
        <Text style={styles.footerText}>some footer text</Text>
      </View> */}
    </NavigationContainer>
  );
}

// Main View Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fa917',
    // padding: 10,
    // alignItems: 'center',
    // justifyContent: 'space-around',
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fa917',
  },
  secondContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 25,
    borderRadius: 30,
  },
  footer: {
    justifyContent: 'flex-end',
    margin: 5,
  },
  footerText: {
    fontSize: 10,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: 'light',
  },
  button: {
    width: 150,
    margin: 10,
    alignSelf: 'center',
  },
});