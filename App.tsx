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
        {/* <Image 
            source={require('./assets/logo.png')} 
            // style={styles.image}
        /> */}
        <Text>
          Welcome to the app
        </Text>
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
          name="start"
          component={App}
        /> 
        {/* <Stack.Screen 
          name="Registrate"
          component={Register}
        /> */}
      </Stack.Navigator>
      <View style={styles.footer}>
        <Text style={styles.footerText}>some footer text</Text>
      </View>
    </NavigationContainer>
  );
}

// Main View Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 10,
    // alignItems: 'center',
    justifyContent: 'space-between',
  },
  buttonContainer: {
    color: '#FF6347',
    marginTop: 10,
    marginLeft: 20,
    marginRight: 20,
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  footer: {
    justifyContent: 'flex-end',
    margin: 5,
  },
  footerText: {
    fontSize: 10,
  },
  titleContainer: {
    margin: 50,
    alignItems: 'center',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 20,
    padding: 10,
  },
});