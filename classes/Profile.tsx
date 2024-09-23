import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function ProfileScreen({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Cuenta</Text>

        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <View style={styles.optionLeft}>
            <Icon name="person-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Perfil</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <View style={styles.optionLeft}>
            <Icon name="lock-closed-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Contraseña</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <View style={styles.optionLeft}>
            <Icon name="notifications-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Notificaciones</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Más</Text>

        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <View style={styles.optionLeft}>
            <Icon name="star-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Reseñas</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.option} onPress={() => {}}>
          <View style={styles.optionLeft}>
            <Icon name="help-circle-outline" size={24} color="#000" />
            <Text style={styles.optionText}>Ayuda</Text>
          </View>
          <Icon name="chevron-forward-outline" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={() => {}}>
        <Text style={styles.logoutText}>Cerrar Sesion</Text>
      </TouchableOpacity>

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Home')} style={styles.homeIconContainer}>
          <Icon name="home-outline" size={30} color="#fff" />
        </TouchableOpacity>
      </View>
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
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#EDEEEF',
  },
  optionLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    fontSize: 16,
    marginLeft: 10,
  },
  logoutButton: {
    marginTop: 'auto', 
    alignItems: 'center',
    marginBottom: 80,
  },
  logoutText: {
    fontSize: 16,
    color: '#878380',
  },
  tabBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#fff',
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#EDEEEF',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  homeIconContainer: {
    backgroundColor: '#f31f35',
    padding: 10,
    borderRadius: 50,
  },
});
