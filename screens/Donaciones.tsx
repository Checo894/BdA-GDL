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
  const [showDescription, setShowDescription] = useState<boolean>(false);

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

          <Text style={styles.title}>Productos para donar</Text>

          {/* Description Toggle */}
          <TouchableOpacity onPress={() => setShowDescription(!showDescription)} style={styles.toggleDescriptionButton}>
            <Text style={styles.toggleDescriptionText}>
              {showDescription ? 'Ocultar descripción' : 'Ver descripción'}
            </Text>
          </TouchableOpacity>

          {showDescription && (
              <Text style={styles.description}>
                Aquí encontrarás todos los productos que ofrece BAMX. Cada producto tiene una cantidad de puntos que se
                acumulan a medida que se usa. ¡Puedes donar productos que te gusten y ganar puntos!
              </Text>
          )}

          {/* Products List */}
          {loading ? (
              <ActivityIndicator size="large" color="#0000ff" />
          ) : (
              products.map((product) => (
                  <View key={product.id} style={styles.productCard}>
                    <TouchableOpacity onPress={() => navigation.navigate('ProductCard', { item: product })}>
                      <Image source={{ uri: product.image_url }} style={styles.productImage} />
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

                    <TouchableOpacity style={styles.addToCartButton} onPress={() => handleAddToCart(product)}>
                      <Text style={styles.addToCartText}>Añadir al carrito</Text>
                    </TouchableOpacity>
                  </View>
              ))
          )}
          <Text style={styles.endOfList}>Fin de la lista</Text>
        </ScrollView>

        <View style={styles.tabBar}>
          <View style={styles.donacionesIconContainer}>
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
    backgroundColor: '#fff',
    padding: 20,
    justifyContent: 'flex-start',
  },
  backIcon: {
    marginBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  productsGrid: {
    paddingBottom: 40,
    marginTop: 42,
  },
  toggleDescriptionButton: {
    marginBottom: 16,
    alignItems: 'center',
    width: '100%',
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#f31f35',
    overflow: 'hidden',
    justifyContent: 'center',
    height: 36,
  },
  toggleDescriptionText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  description: {
    fontSize: 18,
    marginBottom: 24,
    textAlign: 'center',
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
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 28,
  },
  donacionesIconContainer: {
    backgroundColor: '#f31f35',
    padding: 10,
    borderRadius: 50,
  },
  productPoints: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
    textAlign: 'left',
    fontWeight: 'bold',
    marginBottom: 10,
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
  endOfList: {
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 36,
    color: '#5e5e5e',
    textAlign: 'center',
  },
});
