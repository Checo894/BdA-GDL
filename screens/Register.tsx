import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TextInput, Alert, TouchableOpacity, ActivityIndicator } from 'react-native';
import { RootStackParamList } from '../constants/RootStackParamList';
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from '@react-navigation/native';
import { getAuth, createUserWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';

type RegisterScreenNavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function Register() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [missingCriteria, setMissingCriteria] = useState<string[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigation = useNavigation<RegisterScreenNavigationProp>();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });

    return () => unsubscribe();
  }, [auth]);

  const evaluatePasswordStrength = (password: string) => {
    let strength = 0;
    const criteria = [];

    if (password.length >= 6) {
      strength += 1;
    } else {
      criteria.push('6 caracteres');
    }
    if (/[A-Z]/.test(password)) {
      strength += 1;
    } else {
      criteria.push('una letra mayúscula');
    }
    if (/[0-9]/.test(password)) {
      strength += 1;
    } else {
      criteria.push('un número');
    }
    if (/[^A-Za-z0-9]/.test(password)) {
      strength += 1;
    } else {
      criteria.push('un carácter especial');
    }

    setPasswordStrength(strength);
    setMissingCriteria(criteria);
  };

  // Email validation function
  const isValidEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleRegister = async () => {
    if (!isValidEmail(userName)) {
      Alert.alert('Correo inválido', 'Por favor ingresa un correo electrónico válido.');
      return;
    }

    setLoading(true);
    try {
      await createUserWithEmailAndPassword(auth, userName, userPassword);
      setLoading(false);
      Alert.alert('Registro exitoso', '¡Usuario registrado correctamente!');
      navigation.navigate('Home');
    } catch (error: any) {
      setLoading(false);
      Alert.alert('Error al registrarse', error.message);
    }
  };

  return (
      <View style={styles.container}>
        <View style={styles.first}></View>
        <View style={styles.second}>
          <View style={styles.inSecond}>
            <Text style={styles.title}>Registro</Text>
            <TextInput
                style={styles.input}
                placeholder="Correo electrónico"
                value={userName}
                onChangeText={setUserName}
                keyboardType="email-address"
            />
            <TextInput
                style={styles.input}
                placeholder="Contraseña"
                secureTextEntry
                value={userPassword}
                onChangeText={(password) => {
                  setUserPassword(password);
                  evaluatePasswordStrength(password);
                }}
            />
            <View style={styles.passwordStrengthBarContainer}>
              <View style={[styles.passwordStrengthBar, passwordStrength > 0 && { backgroundColor: 'red', width: '25%' }]} />
              <View style={[styles.passwordStrengthBar, passwordStrength > 1 && { backgroundColor: 'orange', width: '50%' }]} />
              <View style={[styles.passwordStrengthBar, passwordStrength > 2 && { backgroundColor: 'yellow', width: '75%' }]} />
              <View style={[styles.passwordStrengthBar, passwordStrength > 3 && { backgroundColor: 'green', width: '100%' }]} />
            </View>
            {missingCriteria.length > 0 && (
                <Text style={styles.criteriaText}>
                  La contraseña debe incluir: {missingCriteria.join(', ')}.
                </Text>
            )}
            <TouchableOpacity
                style={styles.redButton}
                onPress={handleRegister}
                disabled={loading}
            >
              {loading ? (
                  <ActivityIndicator size="small" color="#ffffff" />
              ) : (
                  <Text style={styles.buttonText}>Regístrate</Text>
              )}
            </TouchableOpacity>
            <View style={styles.inlineTextContainer}>
              <Text style={styles.textBold}>¿Ya tienes cuenta? </Text>
              <Text style={styles.textGreen} onPress={() => navigation.navigate('Login')}>
                Inicia sesión
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
  passwordStrengthBarContainer: {
    flexDirection: 'row',
    height: 10,
    marginBottom: 10,
    width: '100%',
  },
  passwordStrengthBar: {
    flex: 1,
    height: '100%',
    backgroundColor: '#EDEEEF',
    marginHorizontal: 2,
  },
  criteriaText: {
    color: 'red',
    marginBottom: 10,
    textAlign: 'center',
  },
});
