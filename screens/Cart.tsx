import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image, ActivityIndicator, Animated, Dimensions, Easing } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartItem, useCart } from '../context/CartContex'; // Asegúrate de que este context esté bien implementado
import { clearUserCart, setUserCart } from '../api/cart/user.cart.service'; // Importamos la función para limpiar el carrito en Firebase
import { getUserPoints, updateUserPoints } from '../api/user/user.points.service'; // Para manejar la acumulación de puntos

const generateUniqueId = () => `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

export default function CartScreen({ navigation }: any) {
  const { cartItems, removeFromCart, setCartItems } = useCart(); // Asegurarse de tener setCartItems disponible en el contexto
  const [itemsWithIds, setItemsWithIds] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Para indicar si está cargando
  const [isClearing, setIsClearing] = useState<boolean>(false); // Estado para cuando se esté limpiando el carrito
  const [userPoints, setUserPoints] = useState<number>(0); // Puntos del usuario
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

  useEffect(() => {
    const fetchUserPoints = async () => {
      try {
        const points = await getUserPoints();
        setUserPoints(points);
      } catch (error) {
        console.error("Error al obtener puntos del usuario:", error);
      }
    };
    fetchUserPoints();
  }, []);

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

  const cleanCart = async () => {
    try {
      setIsClearing(true); // Mostrar el indicador de carga
      await clearUserCart(); // Limpiar el carrito en Firebase
      setCartItems([]); // Limpiar el carrito en el estado local
      setItemsWithIds([]); // Limpiar la vista del carrito

      // Acumular puntos después de la limpieza del carrito
      const newPoints = userPoints + pointsAwarded; // Sumamos los puntos ganados
      await updateUserPoints(newPoints); // Actualizamos los puntos en Firebase
      setUserPoints(newPoints); // Actualizamos los puntos en el estado local

      console.log("Carrito limpiado correctamente y puntos actualizados.");
      setIsClearing(false); // Ocultar el indicador de carga
    } catch (error) {
      console.error("Error al limpiar el carrito o actualizar puntos:", error);
      setIsClearing(false); // Ocultar el indicador de carga en caso de error
    }
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

      <View style={styles.header}>
        <Text style={styles.title}>Carrito</Text>
      </View>

      {isClearing ? (
        // Mostrar indicador de carga mientras se limpia el carrito
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#f31f35" />
          <Text>Donando a BAMX...</Text>
        </View>
      ) : cartItems.length === 0 ? (
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
                  cleanCart(); // Limpiar el carrito y acumular puntos
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
          <Image source={require('../assets/balloon.png')} style={styles.balloonImage} />
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
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backtext: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingBottom: 6,
    color: '#5e5e5e',
  },
  backIcon: {
    marginBottom: 8,
  },
  spacer: {
    marginTop: 42,
  },
});
