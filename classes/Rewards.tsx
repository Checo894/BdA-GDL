import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function RewardsScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState('Recompensas');

  const rewards = [
    {
      id: 1,
      title: 'Cupon para no se que',
      description: 'expira tal dia',
      image: 'https://via.placeholder.com/100', 
    },
    {
      id: 2,
      title: '40% descuento',
      description: 'hasta tal dia',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 3,
      title: '2 en 1 en tienda',
      description: 'mini descripcion flash sale',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 4,
      title: 'Mas ofertas',
      description: 'Flash sale',
      image: 'https://via.placeholder.com/100',
    },
    {
      id: 5,
      title: 'Mas ofertas',
      description: 'Flash sale',
      image: 'https://via.placeholder.com/100',
    },
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.title}>BAMX</Text>
      <Text style={styles.subtitle}>Recompensas</Text>

      <View style={styles.progressBarContainer}>
        <View style={styles.progressBar}>
          <View style={styles.progress} />
        </View>
        <Text style={styles.pointsText}>10</Text>
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Detalles' && styles.tabSelected]}
          onPress={() => setSelectedTab('Detalles')}
        >
          <Text style={selectedTab === 'Detalles' ? styles.tabTextSelected : styles.tabText}>Detalles</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.tab, selectedTab === 'Recompensas' && styles.tabSelected]}
          onPress={() => setSelectedTab('Recompensas')}
        >
          <Text style={selectedTab === 'Recompensas' ? styles.tabTextSelected : styles.tabText}>Recompensas</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={rewards}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.rewardItem}>
            <Image source={{ uri: item.image }} style={styles.rewardImage} />
            <View style={styles.rewardTextContainer}>
              <Text style={styles.rewardTitle}>{item.title}</Text>
              <Text style={styles.rewardDescription}>{item.description}</Text>
            </View>
          </View>
        )}
        contentContainerStyle={styles.listContainer} 
        style={styles.flatList} 
      />
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
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#000',
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  progressBar: {
    flex: 1,
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 5,
    marginRight: 10,
  },
  progress: {
    width: '30%', // Ajustar de acuerdo a los puntos del usuario
    height: '100%',
    backgroundColor: '#0fa917',
    borderRadius: 5,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginBottom: 20,
  },
  tab: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#D1D1D1',
    marginHorizontal: 5,
  },
  tabSelected: {
    backgroundColor: '#f31f35',
    borderColor: '#f31f35',
  },
  tabText: {
    fontSize: 16,
    color: '#000',
  },
  tabTextSelected: {
    color: '#fff',
  },
  flatList: {
    flex: 1, 
  },
  listContainer: {
    paddingBottom: 100, 
  },
  rewardItem: {
    flexDirection: 'row',
    marginBottom: 15,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    padding: 10,
  },
  rewardImage: {
    width: 80,
    height: 80,
    borderRadius: 10,
    marginRight: 10,
  },
  rewardTextContainer: {
    justifyContent: 'center',
  },
  rewardTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  rewardDescription: {
    fontSize: 14,
    color: '#f31f35', 
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
