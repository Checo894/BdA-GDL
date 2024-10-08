import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../constants/RootStackParamList';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

type InicioNavigationProp = NativeStackNavigationProp<RootStackParamList, 'Register'>;

export default function Inicio() {
  const navigation = useNavigation<InicioNavigationProp>();

  return (
      <View style={styles.container}>
        <View style={styles.firstContainer}>
          <Image
              source={require('../assets/images/logosinfondo.png')}
              style={styles.image}
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
          <TouchableOpacity
              style={styles.redButton}
              onPress={() => navigation.navigate('Register')}
          >
            <Text style={styles.buttonText}>Empieza Aquí</Text>
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0fa917',
  },
  firstContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#0fa917',
    padding: 45,
  },
  secondContainer: {
    flex: 1,
    justifyContent: 'space-around',
    backgroundColor: '#ffffff',
    padding: 25,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '200',
  },
  redButton: {
    backgroundColor: '#f31f35',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 50,
    width: '100%',
    alignSelf: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  image: {
    width: 350,
    height: 350,
  },
});
