import React, { useState, useEffect } from 'react';
import { Button, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { RootStackParamList } from '../constants/RootStackParamList';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import {
  getAuth,
  createUserWithEmailAndPassword,
  onAuthStateChanged
} from 'firebase/auth';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Register() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, [auth]);

  // TODO: Si el usuario ya existe, redirigir a la pantalla de Login
  // TODO: Cuadro de registro es muy largo y falta agregar margen
  const handleRegister = async () => {
    const auth = getAuth();
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, userName, userPassword);
      const user = userCredential.user; // FIXME: Unused variable
      Alert.alert('Registro exitoso', '¡Usuario registrado correctamente!');
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Error al registrarse', error.message);
    }
  };

  // TODO: Logged In confirmation pop up
  return (
    <View style={styles.container}>
      <View style={styles.first}></View>
      <View style={styles.second}>
        <View style={styles.inSecond}>
          <Text style={styles.title}>Registro</Text>
          <View>
            <Text style={styles.text}>Usuario</Text>
            <TextInput
              style={styles.input}
              placeholder="Correo electrónico"
              value={userName}
              onChangeText={setUserName}
            />
          </View>
          <View>
            <Text style={styles.text}>Contraseña</Text>
            <TextInput
              style={styles.input}
              placeholder="Contraseña"
              secureTextEntry
              value={userPassword}
              onChangeText={setUserPassword}
            />
          </View>
          <Text style={styles.textCenter} onPress={() => navigation.navigate('Login')}>
            ¿Ya tienes cuenta?
          </Text>
          <View style={styles.button}>
            <View style={{ borderRadius: 30, overflow: 'hidden' }}>
              <Button title="Regístrate" onPress={handleRegister} color={'#f31f35'} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.third}></View>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
  },
  sessionInfo: {
    padding: 15,
    backgroundColor: '#EDEEEF',
    borderRadius: 10,
    alignItems: 'center',
    margin: 10,
  },
  sessionText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#0fa917',
    marginBottom: 10,
  },
  first: {
    backgroundColor: '#0fa917',
    padding: 45,
  },
  second: {
    flex: 5,
    backgroundColor: '#0fa917',
    paddingTop: 45,
    paddingBottom: 45,
  },
  inSecond: {
    flex: 1,
    backgroundColor: '#ffffff',
    padding: 25,
    paddingHorizontal: 65,
    borderRadius: 30,
    justifyContent: 'space-around',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
    fontWeight: 'bold',
  },
  text: {
    fontSize: 18,
    textAlign: 'left',
    fontWeight: '200',
  },
  textCenter: {
    fontSize: 18,
    textAlign: 'center',
    fontWeight: '200',
    textDecorationLine: 'underline',
  },
  input: {
    height: 40,
    borderColor: '#878380',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#EDEEEF',
  },
  button: {
    width: 150,
    margin: 10,
    alignSelf: 'center',
    borderRadius: 30,
  },
  third: {
    backgroundColor: '#0fa917',
    padding: 45,
  },
});
