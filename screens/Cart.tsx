import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { CartItem, useCart } from '../context/CartContex';

const generateUniqueId = () => `${Date.now()}_${Math.floor(Math.random() * 10000)}`;

export default function CartScreen({ navigation }: any) {
  const { cartItems, removeFromCart } = useCart();

  const [itemsWithIds, setItemsWithIds] = useState<CartItem[]>([]);

  useEffect(() => {
    const assignCartItemIds = () => {
      const updatedItems = cartItems.map((item) => {
        if (!item.cartItemId) {
          return { ...item, cartItemId: generateUniqueId() };
        }
        return item;
      });
      setItemsWithIds(updatedItems);
    };

    assignCartItemIds();
  }, [cartItems]);

  const products = itemsWithIds.filter((item) => item.type === 'product');
  const rewards = itemsWithIds.filter((item) => item.type === 'reward');

  const subtotal = products.reduce((sum, item) => sum + (item.price || 0), 0);
  const processingFee = subtotal > 0 ? 5.00 : 0;
  const total = subtotal + processingFee;
  const totalPoints = rewards.reduce((sum, item) => sum + (item.points_cost || 0), 0);

  let buttonText = '';
  if (products.length > 0 && rewards.length > 0) {
    buttonText = 'Donar y Canjear';
  } else if (products.length > 0) {
    buttonText = 'Donar';
  } else if (rewards.length > 0) {
    buttonText = 'Canjear';
  }

  // TODO: Optional make cart items clickable to navigate to product details
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
                    </>
                )}
                {rewards.length > 0 && (
                    <View style={styles.row}>
                      <Text style={styles.totalText}>Total de puntos</Text>
                      <Text style={styles.totalText}>{totalPoints} puntos</Text>
                    </View>
                )}
                {buttonText && (
                    <TouchableOpacity style={styles.donateButton} onPress={() => {}}>
                      <Text style={styles.donateButtonText}>{buttonText}</Text>
                    </TouchableOpacity>
                )}
              </View>
            </>
        )}
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
});
