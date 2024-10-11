// TODO: Check if amount of products in cart is not greater than the stock quantity of the product
//  -This may be better to implement in the ProductCard screen

import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Animated, Dimensions, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartItem, useCart } from '../context/CartContex';

const generateUniqueId = () => `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

export default function CartScreen({ navigation }: any) {
  const { cartItems, removeFromCart } = useCart();

  const [itemsWithIds, setItemsWithIds] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [balloons, setBalloons] = useState<Animated.Value[]>([]);

  useEffect(() => {
    const assignCartItemIds = () => {
      const updatedItems = cartItems.map((item) => {
        if (!item.cartItemId) {
          return { ...item, cartItemId: generateUniqueId() };
        }
        return item;
      });
      setItemsWithIds(updatedItems);
      setLoading(false);
    };

    assignCartItemIds();
  }, [cartItems]);

  const startBalloonAnimation = () => {
    const newBalloons = Array.from({ length: 20 }).map(() => new Animated.Value(Dimensions.get('window').height));
    setBalloons(newBalloons);
    newBalloons.forEach((balloon, index) => {
      Animated.timing(balloon, {
        toValue: -100,
        duration: 4000 + index * 200,
        easing: Easing.bezier(0.42, 0, 0.58, 1),
        useNativeDriver: true,
      }).start();
    });
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#f31f35" />
      </View>
    );
  }

  const products = itemsWithIds.filter((item) => item.type === 'product');
  const rewards = itemsWithIds.filter((item) => item.type === 'reward');

  const subtotal = products.reduce((sum, item) => sum + (item.price || 0), 0);
  const processingFee = subtotal > 0 ? 5.0 : 0;
  const total = subtotal + processingFee;
  const totalPoints = rewards.reduce((sum, item) => sum + (item.points_cost || 0), 0);
  const pointsAwarded = products.reduce((sum, item) => sum + (item.points_awarded || 0), 0);

  let buttonText = '';
  if (products.length > 0 && rewards.length > 0) {
    buttonText = 'Donar y Canjear';
  } else if (products.length > 0) {
    buttonText = 'Donar';
  } else if (rewards.length > 0) {
    buttonText = 'Canjear';
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Carrito</Text>
      </View>

      {cartItems.length === 0 ? (
        <Text style={styles.emptyCartText}>No hay nada en el carrito</Text>
      ) : (
        <>
          {rewards.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Recompensas</Text>
              <FlatList
                data={rewards}
                keyExtractor={(item) => item.cartItemId!}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Image source={{ uri: item.image_url }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.rewardPoints}>Costo: {item.points_cost} puntos</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.cartItemId!)}>
                      <Icon name="trash-outline" size={24} color="#878380" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          )}

          {products.length > 0 && (
            <>
              <Text style={styles.sectionTitle}>Donaciones</Text>
              <FlatList
                data={products}
                keyExtractor={(item) => item.cartItemId!}
                renderItem={({ item }) => (
                  <View style={styles.cartItem}>
                    <Image source={{ uri: item.image_url }} style={styles.productImage} />
                    <View style={styles.productDetails}>
                      <Text style={styles.productName}>{item.name}</Text>
                      <Text style={styles.productPrice}>${item.price?.toFixed(2)}</Text>
                    </View>
                    <TouchableOpacity onPress={() => removeFromCart(item.cartItemId!)}>
                      <Icon name="trash-outline" size={24} color="#878380" />
                    </TouchableOpacity>
                  </View>
                )}
              />
            </>
          )}

          <View style={styles.summaryContainer}>
            {products.length > 0 && (
              <>
                <View style={styles.row}>
                  <Text style={styles.subtotalText}>Subtotal</Text>
                  <Text style={styles.subtotalText}>${subtotal.toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.subtotalText}>Cuota de procesamiento</Text>
                  <Text style={styles.subtotalText}>${processingFee.toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.totalText}>Total</Text>
                  <Text style={styles.totalText}>MXN ${total.toFixed(2)}</Text>
                </View>
                <View style={styles.row}>
                  <Text style={styles.pointsText}>Puntos a Ganar</Text>
                  <Text style={styles.pointsText}>{pointsAwarded} puntos</Text>
                </View>
              </>
            )}
            {rewards.length > 0 && (
              <View style={styles.row}>
                <Text style={styles.totalText}>Total de puntos</Text>
                <Text style={styles.totalText}>{totalPoints} puntos</Text>
              </View>
            )}
            {buttonText && (
              <TouchableOpacity
                style={styles.donateButton}
                onPress={() => {
                  startBalloonAnimation();
                }}
              >
                <Text style={styles.donateButtonText}>{buttonText}</Text>
              </TouchableOpacity>
            )}
          </View>
        </>
      )}

      {balloons.map((balloon, index) => (
        <Animated.View
          key={index}
          style={[
            styles.balloon,
            {
              transform: [{ translateY: balloon }],
              left: Math.random() * Dimensions.get('window').width,
            },
          ]}
        >
          <Image
            source={require('../assets/balloon.png')}
            style={styles.balloonImage}
          />
        </Animated.View>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
  },
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDEEEF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  productImage: {
    width: 50,
    height: 50,
    borderRadius: 10,
  },
  productDetails: {
    flex: 1,
    marginLeft: 15,
  },
  productName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 16,
    color: '#878380',
  },
  rewardPoints: {
    fontSize: 16,
    color: '#878380',
  },
  summaryContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#EDEEEF',
    paddingTop: 20,
    paddingVertical: 28,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  subtotalText: {
    fontSize: 16,
    color: '#878380',
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  donateButton: {
    backgroundColor: '#f31f35',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 20,
  },
  donateButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyCartText: {
    fontSize: 18,
    color: '#878380',
    textAlign: 'center',
    marginTop: 20,
  },
  pointsText: {
    fontSize: 16,
    color: '#f31f35',
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  balloon: {
    position: 'absolute',
    width: 70, 
    height: 100, 
  },
  balloonImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
});
