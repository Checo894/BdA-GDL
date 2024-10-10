import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductCard({ route, navigation }: any) {
  const { item } = route.params;
  const isProduct = item && typeof item === 'object' && 'price' in item;

  return (
      <View style={styles.container}>
        <Icon
            name="arrow-back-outline"
            size={24}
            onPress={() => navigation.goBack()}
            style={styles.backIcon}
        />
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
                <Text style={styles.productTitle}>{item.name}</Text>
                {/* Conditionally render product or reward attributes */}
                {isProduct ? (
                    <>
                      <Text style={styles.productPrice}>MXN ${item.price}</Text>
                      <Text style={styles.productDescription}>
                        Stock disponible: {item.stock_quantity}
                      </Text>
                    </>
                ) : (
                    <>
                      <Text style={styles.rewardPoints}>
                        Costo en puntos: {item.points_cost} puntos
                      </Text>
                    </>
                )}

                <Text style={styles.productDescription}>
                  {item.description}
                </Text>

                {isProduct ? (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          //TODO: Add to cart logic here
                        }}
                    >
                      <Text
                          style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}
                      >
                        Añadir al carrito
                      </Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.button}
                        onPress={() => {
                          //TODO: Buy logic here
                        }}
                    >
                      <Text
                          style={{color: '#fff', fontWeight: 'bold', fontSize: 16}}
                      >
                        Canjear con puntos
                      </Text>
                    </TouchableOpacity>
                )}
              </>
          ) : (
              <Text style={styles.loadingText}>Cargando...</Text>
          )}
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
    marginBottom: 20,
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
    marginVertical: 8,
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
});
