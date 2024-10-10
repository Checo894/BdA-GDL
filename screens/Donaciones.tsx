import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Image } from 'react-native';
import { Product } from "../model/ProductModel";
import { getProducts } from "../api/product/products.service";
import Icon from 'react-native-vector-icons/Ionicons';
import { useCart } from '../context/CartContex';
import { CartItem } from '../context/CartContex';

export default function Donaciones({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const { addToCart } = useCart();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const products = await getProducts();
        setProducts(products);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleAddToCart = (product: Product) => {
    const cartItem: CartItem = {
      id: product.id,
      name: product.name,
      type: 'product',
      price: product.price,
      image_url: product.image_url,
      points_awarded: product.points_awarded,
    };
    addToCart(cartItem);
    navigation.navigate('Cart');
  };

  return (
      <View style={styles.container}>
        <ScrollView contentContainerStyle={styles.productsGrid}>
          <Icon
              name="arrow-back-outline"
              size={24}
              onPress={() => navigation.goBack()}
              style={styles.backIcon}
          />
          <Text style={styles.title}>Productos</Text>
          <Text style={styles.description}>
            ¡Aquí encontrarás todos los productos que ofrece BAMX! describir como funcionan las donaciones !!!
          </Text>
          {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
          ) : (
              products.map((product, index) => (
                  <View key={product.id} style={styles.productCard}>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('ProductCard', { item: product })}
                    >
                      <Image
                          source={{ uri: product.image_url }}
                          style={styles.productImage}
                      />
                      <View style={styles.productInfo}>
                        <View style={styles.productNameStock}>
                          <Text style={styles.productName}>{product.name}</Text>
                          <Text style={styles.productStock}>Stock: {product.stock_quantity}</Text>
                        </View>
                        <Text style={styles.productPrice}>MXN ${product.price}</Text>
                        <Text style={styles.productPoints}>Puntos ganados: {product.points_awarded}</Text>
                        <Text style={styles.productDescription}>{product.description}</Text>
                      </View>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.addToCartButton}
                        onPress={() => handleAddToCart(product)}
                    >
                      <Text style={styles.addToCartText}>Añadir al carrito</Text>
                    </TouchableOpacity>
                  </View>
              ))
          )}
        </ScrollView>

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
    marginTop: -12,
    marginBottom: 12,
  },
  productsGrid: {
    paddingBottom: 20,
  },
  productCard: {
    width: '100%',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  productImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    resizeMode: 'cover',
    marginBottom: 10,
  },
  productInfo: {
    alignItems: 'flex-start',
  },
  productNameStock: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    marginBottom: 5,
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  productStock: {
    fontSize: 14,
    color: '#555',
  },
  productPrice: {
    fontSize: 16,
    color: '#f31f35',
    fontWeight: 'bold',
    marginBottom: 5,
  },
  productDescription: {
    fontSize: 14,
    color: '#888',
    marginBottom: 10,
  },
  addToCartButton: {
    backgroundColor: '#e11d2f',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  addToCartText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
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
    paddingVertical: 28,
  },
  homeIconContainer: {
    backgroundColor: '#f31f35',
    padding: 10,
    borderRadius: 50,
  },
  backIcon: {
    marginBottom: 20,
  },
  description: {
    fontSize: 18,
    marginBottom: 24,
    fontWeight: '600',
    textAlign: 'center',
  },
  productPoints: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
  },
});
