import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ConfProfile({ navigation }: { navigation: any }) {
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    email: 'usuario@example.com',
    nombre: 'Nombre',
    apellido: 'Apellido',
    cumpleanos: '01/01/2000',
  });

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

      <Text style={styles.sectionTitle}>Perfil</Text>

      {isEditing ? (
        <View>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={profileData.email}
            onChangeText={(text) => setProfileData({ ...profileData, email: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Nombre"
            value={profileData.nombre}
            onChangeText={(text) => setProfileData({ ...profileData, nombre: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Apellido"
            value={profileData.apellido}
            onChangeText={(text) => setProfileData({ ...profileData, apellido: text })}
          />
          <TextInput
            style={styles.input}
            placeholder="Cumpleaños"
            value={profileData.cumpleanos}
            onChangeText={(text) => setProfileData({ ...profileData, cumpleanos: text })}
          />
          <TouchableOpacity
            style={styles.saveButton}
            onPress={() => setIsEditing(false)}
          >
            <Text style={styles.saveButtonText}>Guardar</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View>
          <Text style={styles.text}>Email: {profileData.email}</Text>
          <Text style={styles.text}>Nombre: {profileData.nombre}</Text>
          <Text style={styles.text}>Apellido: {profileData.apellido}</Text>
          <Text style={styles.text}>Cumpleaños: {profileData.cumpleanos}</Text>
          <TouchableOpacity
            style={styles.editButton}
            onPress={() => setIsEditing(true)}
          >
            <Text style={styles.editButtonText}>Editar Información</Text>
          </TouchableOpacity>
        </View>
      )}
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
  text: {
    fontSize: 18,
    fontWeight: '500',
    color: '#333',
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
  editButton: {
    backgroundColor: '#f31f35',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 20,
  },
  editButtonText: {
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
