import React, { useState } from 'react';
import { View, Text, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ConfNotification({ navigation }: { navigation: any }) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const [frequency, setFrequency] = useState('daily');

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
        <Icon name="arrow-back-outline" size={24} color="#000" />
      </TouchableOpacity>
      <Text style={styles.sectionTitle}>Notificaciones</Text>
      <View style={styles.switchContainer}>
        <Text style={styles.optionText}>Habilitar Notificaciones</Text>
        <Switch
          value={notificationsEnabled}
          onValueChange={(value) => setNotificationsEnabled(value)}
        />
      </View>
      <Text style={styles.optionText}>Frecuencia de Notificaciones</Text>
      <Picker
        selectedValue={frequency}
        style={styles.picker}
        onValueChange={(itemValue: string) => setFrequency(itemValue)}>
        <Picker.Item label="Diario" value="daily" />
        <Picker.Item label="Semanal" value="weekly" />
        <Picker.Item label="Mensual" value="monthly" />
      </Picker>
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
  switchContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionText: {
    fontSize: 18,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 15,
  },
});