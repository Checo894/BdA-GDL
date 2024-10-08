import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '../constants/RootStackParamList';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
// @ts-ignore - Implicit any typescript error ignore
import { auth } from "../api/firebase.service";

type LoginScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Login() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigation = useNavigation<LoginScreenNavigationProp>();

  useEffect(() => {
    // @ts-ignore - Implicit any typescript error ignore
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, []);

  const handleLogin = async () => {
    try {
      // @ts-ignore - Implicit any typescript error ignore
      await signInWithEmailAndPassword(auth, userName, userPassword);
      Alert.alert('Inicio de sesión exitoso', '¡Bienvenido de nuevo!');
      navigation.navigate('Home');
    } catch (error: any) {
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.first}></View>
        <View style={styles.second}>
          <View style={styles.inSecond}>
            <Text style={styles.title}>Inicio de Sesión</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={userName}
                onChangeText={setUserName}
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={userPassword}
                onChangeText={setUserPassword}
            />
            <TouchableOpacity
                style={styles.redButton}
                onPress={handleLogin}
            >
              <Text style={styles.buttonText}>Ingresa</Text>
            </TouchableOpacity>
            <View style={styles.inlineTextContainer}>
              <Text style={styles.textBold}>¿No tienes cuenta? </Text>
              <Text style={styles.textGreen} onPress={() => navigation.navigate('Register')}>
                Regístrate
              </Text>
            </View>
          </View>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  first: {
    backgroundColor: '#0fa917',
    padding: 20,
  },
  second: {
    flex: 4,
    backgroundColor: '#0fa917',
    paddingVertical: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  inSecond: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 40,
    paddingVertical: 30,
    marginHorizontal: 20,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    width: '90%',
    minHeight: 350,
  },
  title: {
    fontSize: 28,
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inlineTextContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  textBold: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  textGreen: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#0fa917',
    textDecorationLine: 'underline',
  },
  input: {
    height: 40,
    borderColor: '#878380',
    borderWidth: 1,
    marginBottom: 15,
    paddingHorizontal: 10,
    borderRadius: 10,
    backgroundColor: '#EDEEEF',
    width: '100%',
  },
  redButton: {
    backgroundColor: '#f31f35',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
    height: 50,
    marginBottom: 15,
    alignSelf: 'center',
    width: '100%',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
