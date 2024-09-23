import React, { useState } from 'react';
import { Button, StyleSheet, View, Text, TextInput, Alert } from 'react-native';
import { useNavigation } from '@react-navigation/native';
// Importamos las funciones necesarias de Firebase
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

export default function Login() {
  const [userName, setUserName] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const navigation = useNavigation();

  // Función para iniciar sesión
  const handleLogin = async () => {
    const auth = getAuth();
    try {
      // Iniciar sesión con correo y contraseña
      const userCredential = await signInWithEmailAndPassword(auth, userName, userPassword);
      const user = userCredential.user;
      Alert.alert('Inicio de sesión exitoso', '¡Bienvenido de nuevo!');
      navigation.navigate('Home');
    } catch (error: any) {
      // Manejar errores y mostrar alerta
      Alert.alert('Error al iniciar sesión', error.message);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.first}></View>
      <View style={styles.second}>
        <View style={styles.inSecond}>
          <Text style={styles.title}>Inicio de Sesión</Text>
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
          <View style={styles.button}>
            <View style={{ borderRadius: 30, overflow: 'hidden' }}>
              <Button title="Ingresa" onPress={handleLogin} color={'#f31f35'} />
            </View>
          </View>
        </View>
      </View>
      <View style={styles.third}></View>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffffff',
    height: '100%',
    width: '100%',
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



// import React from 'react';
// import { useState, useEffect } from 'react';
// import { Button, StyleSheet, View, Text, FlatList, TouchableOpacity, Image, StatusBar, ActivityIndicator, TextInput } from 'react-native';

// export default function Login({navigation} : any) {
//     const [userName, setUserName] = useState('');
//     const [userPassword, setUserPassword] = useState('');


//     return (
//         <View style={styles.container}>
//             <View style={styles.first}></View>
//             <View style={styles.second}>
//                 <View style={styles.inSecond}>
//                     <Text style={styles.title}>Inicio de Sesión</Text>
//                     <View>
//                         <Text style={styles.text}>Usuario</Text>
//                         <TextInput
//                             style={styles.input}
//                             placeholder=""
//                             value={userName}
//                             onChangeText={setUserName}
//                         />
//                     </View>
//                     <View>
//                         <Text style={styles.text}>Contraseña</Text>    
//                         <TextInput
//                             style={styles.input}
//                             placeholder=""
//                             value={userPassword}
//                             onChangeText={setUserPassword}
//                         />
//                     </View>
//                     <View style={styles.button}>
//                         <View style={{ borderRadius: 30, overflow: 'hidden' }}>
//                             <Button
//                             title="Ingresa"
//                             onPress={() => navigation.navigate('Home')}
//                             color={'#f31f35'}
//                             />
//                         </View>
//                     </View>
//                 </View>
//             </View>
//             <View style={styles.third}></View>
//         </View>
//     );
// }

// // Styles
// const styles = StyleSheet.create({
//     container: {
//         backgroundColor: '#ffffff',
//         height: '100%',
//         width: '100%',
//         // alignItems: 'center',
//     },
//     first: {
//         // flex: 1,
//         backgroundColor: '#0fa917',
//         padding: 45,
//     },
//     second: {
//         flex: 5,
//         backgroundColor: '#0fa917',
//         paddingTop: 45,
//         paddingBottom: 45,
//     },
//     inSecond: {
//         flex: 1,
//         backgroundColor: '#ffffff',
//         padding: 25,
//         paddingHorizontal: 65,
//         borderRadius: 30,
//         justifyContent: 'space-around',
//     },
//     title: {
//         fontSize: 30,
//         textAlign: 'center',
//         fontWeight: 'bold',
//     },
//     text: {
//         fontSize: 18,
//         textAlign: 'left',
//         fontWeight: '200',
//     },
//     textCenter: {
//         fontSize: 18,
//         textAlign: 'center',
//         fontWeight: '200',
//         textDecorationLine: 'underline',
//     },
//     input: {
//         height: 40,
//         borderColor: '#878380',
//         borderWidth: 1,
//         marginBottom: 10,
//         paddingHorizontal: 10,
//         borderRadius: 10,
//         backgroundColor: '#EDEEEF',
//     },
//     button: {
//         width: 150,
//         margin: 10,
//         alignSelf: 'center',
//         borderRadius: 30,
//     },
//     third: {
//         // flex: 1,
//         backgroundColor: '#0fa917',
//         padding: 45,
//     },
// });
