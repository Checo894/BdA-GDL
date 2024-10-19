import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, ActivityIndicator, Alert } from 'react-native';
import { getUserPoints, updateUserPoints } from "../api/user/user.points.service";
import { getRewards } from "../api/rewards/rewards.service";
import { Rewards } from "../model/RewardsModel";
import Icon from 'react-native-vector-icons/Ionicons';

export default function RewardsScreen({ navigation }: any) {
  const [selectedTab, setSelectedTab] = useState('Recompensas');
  const [userPoints, setUserPoints] = useState<number | null>(null);
  const [rewards, setRewards] = useState<Rewards[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const points = await getUserPoints();
        setUserPoints(points);
        const rewardsData = await getRewards();
        setRewards(rewardsData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleRedeemReward = async (reward: Rewards) => {
    if (userPoints !== null && userPoints >= reward.points_cost) {
      try {
        const newPoints = userPoints - reward.points_cost;
        await updateUserPoints(newPoints); 
        setUserPoints(newPoints);

        Alert.alert(
          "¡Felicidades!",
          `Has canjeado la recompensa: ${reward.name}`
        );
      } catch (error) {
        Alert.alert("Error", "Hubo un problema al canjear la recompensa. Inténtalo de nuevo.");
        console.error("Error al canjear la recompensa:", error);
      }
    } else {
      Alert.alert(
        "Puntos insuficientes",
        "No tienes suficientes puntos para canjear esta recompensa."
      );
    }
  };

  return (
    <View style={styles.container}>
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

      <Text style={styles.title}>BAMX</Text>
      <Text style={styles.subtitle}>Recompensas</Text>

      {userPoints !== null && (
        <>
          <View style={styles.progressBarContainer}>
            <View style={styles.progressBar}>
              <View style={[styles.progress, { width: `${Math.min(userPoints, 100)}%` }]} />
            </View>
          </View>
          <Text style={styles.pointsText}>Puntos acumulados: {userPoints} Puntos</Text>
        </>
      )}

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

      {loading ? (
        <ActivityIndicator size="large" color="#0000ff" style={styles.loadingIndicator} />
      ) : (
        selectedTab === 'Recompensas' ? (
          <FlatList
            data={rewards}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.rewardItem}
                onPress={() => handleRedeemReward(item)}
              >
                <Image source={{ uri: item.image_url }} style={styles.rewardImage} />
                <View style={styles.rewardTextContainer}>
                  <Text style={styles.rewardTitle}>{item.name}</Text>
                  <Text style={styles.rewardDescription}>{item.description}</Text>
                  <Text style={styles.rewardPoints}>Costo: {item.points_cost} puntos</Text>
                </View>
              </TouchableOpacity>
            )}
            contentContainerStyle={styles.listContainer}
            style={styles.flatList}
          />
        ) : (
          <Text style={styles.detailsText}>
            {/* ...texto de detalles... */}
          </Text>
        )
      )}

      {/* Tab Bar */}
      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate('Donaciones')}>
          <Icon name="grid-outline" size={30} />
        </TouchableOpacity>
        <View style={styles.rewardsIconContainer}>
          <Icon name="star-outline" size={30} color="#fff" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Home')}>
          <Icon name="home-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Cart')}>
          <Icon name="cart-outline" size={30} />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => navigation.navigate('Profile')}>
          <Icon name="person-outline" size={30} />
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
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    marginTop: 36,
  },
  backIcon: {
    marginRight: 8,
  },
  backtext: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#5e5e5e',
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
    marginBottom: 10,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#F0F0F0',
    borderRadius: 10,
    overflow: 'hidden',
  },
  progress: {
    height: '100%',
    backgroundColor: '#0fa917',
    borderRadius: 10,
  },
  pointsText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    textAlign: 'left',
    marginTop: 5,
    marginBottom: 20,
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
    width: '50%',
  },
  tabSelected: {
    backgroundColor: '#f31f35',
    borderColor: '#f31f35',
  },
  tabText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
  },
  tabTextSelected: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 16,
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
    flex: 1,
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
  rewardPoints: {
    fontSize: 14,
    color: '#000',
    marginTop: 5,
    textAlign: 'left',
  },
  detailsText: {
    fontSize: 16,
    color: '#555',
    textAlign: 'left',
    marginVertical: 20,
  },
  boldText: {
    fontWeight: 'bold',
    color: '#000',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#f31f35',
    marginTop: 10,
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 28,
  },
  rewardsIconContainer: {
    backgroundColor: '#f31f35',
    padding: 10,
    borderRadius: 50,
  },
  loadingIndicator: {
    marginTop: 20,
  },
});
