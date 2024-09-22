import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import TheCharacters from './classes/Characters';
import TheCars from './classes/Cars';

const Stack = createNativeStackNavigator();

// Main view of the app
function App({navigation} : any) {

  return (
    <View style={styles.container}>
      <View style={styles.firstContainer}>
        <View style={styles.titleContainer}>
          <Text style={styles.title}>HELLO!</Text>
          <Text style={styles.text}>And welcome to my app</Text>
        </View>
        <View>
          <Text style={styles.text}>Choose a category:</Text>
          <StatusBar style="auto" />
        </View>
        <View>
          <View style={styles.buttonContainer}>
            <Button 
              title="The Characters"
              onPress={() => {
                navigation.navigate("The Characters");
              }}
            />
          </View>
          <View style={styles.buttonContainer}>
            <Button
              title="The Cars"
              onPress={() => {
                navigation.navigate("The Cars");
              }}
            />
          </View>
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
          name="Main"
          component={App}
        /> 
        <Stack.Screen 
          name="The Characters"
          component={TheCharacters}
        />
        <Stack.Screen 
          name="The Cars"
          component={TheCars}
        />
      </Stack.Navigator>
      <View style={styles.footer}>
        <Text style={styles.footerText}>Made by: Sergio E. Gutiérrez T.</Text>
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