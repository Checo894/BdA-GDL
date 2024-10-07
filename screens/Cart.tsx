import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons'; 

export default function CartScreen({ navigation }: any) {
  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Producto', price: 99.99 },
    { id: 2, name: 'Producto', price: 99.99 },
    { id: 3, name: 'Producto', price: 99.99 },
  ]);

  const removeItem = (id: number) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price, 0);
  const total = subtotal + 0.01; 

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} />
        <Text style={styles.title}>Carrito</Text>
      </View>

      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.cartItem}>
            <View style={styles.productImagePlaceholder} />
            <View style={styles.productDetails}>
              <Text style={styles.productName}>{item.name}</Text>
              <Text style={styles.productPrice}>${item.price.toFixed(2)}</Text>
            </View>
            <TouchableOpacity onPress={() => removeItem(item.id)}>
              <Icon name="trash-outline" size={24} color="#878380" />
            </TouchableOpacity>
          </View>
        )}
      />

      <View style={styles.summaryContainer}>
        <View style={styles.row}>
          <Text style={styles.subtotalText}>Subtotal</Text>
          <Text style={styles.subtotalText}>${subtotal.toFixed(2)}</Text>
        </View>
        <View style={styles.row}>
          <Text style={styles.totalText}>Total</Text>
          <Text style={styles.totalText}>${total.toFixed(2)}</Text>
        </View>

        <TouchableOpacity style={styles.donateButton} onPress={() => {}}>
          <Text style={styles.donateButtonText}>Donar</Text>
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
  cartItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#EDEEEF',
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
  },
  productImagePlaceholder: {
    width: 50,
    height: 50,
    backgroundColor: '#D1D1D1',
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
  summaryContainer: {
    marginTop: 20,
    borderTopWidth: 1,
    borderTopColor: '#EDEEEF',
    paddingTop: 20,
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
});
