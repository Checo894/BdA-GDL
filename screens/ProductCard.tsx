import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContex';
import { CartItem } from '../context/CartContex';
import { getUserPoints } from "../api/user/user.points.service";

export default function ProductCard({ route, navigation }: any) {
  const { item } = route.params;
  const { addToCart, cartItems } = useCart();

  const isProduct = item && typeof item === 'object' && 'price' in item;

  const [userPoints, setUserPoints] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const points = await getUserPoints();
        setUserPoints(points);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: item.id,
      name: item.name,
      type: isProduct ? 'product' : 'reward',
      image_url: item.image_url,
      points_awarded: item.points_awarded,
      ...(isProduct ? { price: item.price } : { points_cost: item.points_cost }),
    };

    if (isProduct) {
      const currentCount = cartItems.filter(cartItem => cartItem.id === item.id).length;
      if (currentCount + 1 > item.stock_quantity) {
        Alert.alert(
            'Stock insuficiente',
            'No puedes añadir más unidades de este producto porque se excede el stock disponible.',
            [{ text: 'OK' }]
        );
        return;
      }
    }

    if (!isProduct) {
      if (userPoints >= item.points_cost) {
        console.log('redeemed a reward');
        addToCart(cartItem);
        navigation.navigate('Cart');
      } else {
        Alert.alert(
          'Puntos insuficientes',
          'No tienes suficientes puntos para canjear esta recompensa.',
          [{ text: 'OK' }]
        );
      }
    } else {
      addToCart(cartItem);
      navigation.navigate('Cart');
    }
  };

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
      <View style={styles.productImageContainer}>
        {item && item.image_url ? (
          <Image source={{ uri: item.image_url }} style={styles.productImage} />
        ) : (
          <Text>Image Slider Placeholder</Text>
        )}
      </View>
      <View style={styles.productDetails}>
        {item ? (
          <>
            <View style={styles.productNameStock}>
              <Text style={styles.productTitle}>{item.name}</Text>
              {item.stock_quantity != null && (
                <Text style={styles.productDescription}>Stock disponible: {item.stock_quantity}</Text>
              )}
            </View>
            {isProduct ? (
              <>
                <Text style={styles.productPrice}>MXN ${item.price}</Text>
                <Text style={styles.productPoints}>Puntos ganados: {item.points_awarded}</Text>
              </>
            ) : (
              <Text style={styles.rewardPoints}>Costo en puntos: {item.points_cost} puntos</Text>
            )}
            <Text style={styles.productDescription}>{item.description}</Text>
            <TouchableOpacity style={styles.button} onPress={handleAddToCart}>
              <Text style={{ color: '#fff', fontWeight: 'bold', fontSize: 16 }}>
                {isProduct ? 'Añadir al carrito' : 'Canjear con puntos'}
              </Text>
            </TouchableOpacity>
          </>
        ) : (
          <Text style={styles.loadingText}>Cargando...</Text>
        )}
      </View>

      {/* Barra de navegación manual */}
      <View style={styles.tabBar}>
        <View style={styles.gridIconContainer}>
          <Icon name="grid-outline" size={30} color="#fff" />
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('Rewards')}>
          <Icon name="star-outline" size={30} />
        </TouchableOpacity>
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
    padding: 20,
    backgroundColor: '#fff',
  },
  backIcon: {
    marginBottom: 4,
  },
  productImageContainer: {
    height: 200,
    backgroundColor: '#f0f0f0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  productImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  productDetails: {
    marginTop: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    marginVertical: 2,
    color: '#f31f35',
  },
  rewardPoints: {
    fontSize: 20,
    marginVertical: 8,
    color: '#f31f35',
  },
  productDescription: {
    marginBottom: 8,
    fontSize: 16,
  },
  loadingText: {
    fontSize: 18,
    color: '#878380',
    textAlign: 'center',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#e11d2f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
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
  gridIconContainer: {
    backgroundColor: '#f31f35',
    padding: 10,
    borderRadius: 50,
  },
  homeIconContainer: {
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 50,
  },
  productPoints: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productNameStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 0,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backtext: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingBottom: 6,
    color: '#5e5e5e',
  },
  spacer: {
    marginTop: 42,
  },
});

