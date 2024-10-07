import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductsLayout({ navigation }: any) {
  const products = Array.from({ length: 6 }).map((_, index) => ({
    id: index + 1,
    title: 'Producto',
    price: '$99.99',
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>

      <View style={styles.productsGrid}>
        {products.map((product) => (
          <TouchableOpacity
            key={product.id}
            style={styles.productCard}
            onPress={() => navigation.navigate('ProductCard')}
          >
            <Text>{product.title}</Text>
            <Text>{product.price}</Text>
          </TouchableOpacity>
        ))}
      </View>

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
    padding: 20,
    justifyContent: 'flex-start',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productCard: {
    width: '45%',
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    marginBottom: 10,
    alignItems: 'center',
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
