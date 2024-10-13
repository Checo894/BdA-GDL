import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ConfPassword({ navigation }: { navigation: any }) {
  return (
    <View style={styles.container}>
      <View style={styles.spacer}>
        {/* Back Icon */}
        <View style={styles.backContainer}>
          <Icon
              name="arrow-back-outline"
              size={24}
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
              color="#5e5e5e"
          />
          <Text style={styles.backtext}>Regresar</Text>
        </View>
      </View>
      <Text style={styles.sectionTitle}>Cambiar Contraseña</Text>
      <TextInput style={styles.input} placeholder="Nueva Contraseña" secureTextEntry={true} />
      <TextInput style={styles.input} placeholder="Confirmar Contraseña" secureTextEntry={true} />
      <TouchableOpacity style={styles.saveButton} onPress={() => {}}>
        <Text style={styles.saveButtonText}>Guardar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#EDEEEF',
    borderRadius: 5,
    padding: 10,
    marginBottom: 15,
  },
  saveButton: {
    backgroundColor: '#f31f35',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  spacer: {
    marginTop: 42,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backIcon: {
    marginBottom: 4,
  },
  backtext: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingBottom: 6,
    color: '#5e5e5e',
  },

});
