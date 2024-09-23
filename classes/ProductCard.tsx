import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function ProductCard({ navigation }: any) {
  return (
    <View style={styles.container}>
      <Icon name="arrow-back-outline" size={24} onPress={() => navigation.goBack()} style={styles.backIcon} />
      <View style={styles.productImageContainer}>
        <Text>Image Slider Placeholder</Text>
      </View>
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>Producto</Text>
        <Text style={styles.productPrice}>$99.99</Text>
        <Text style={styles.productDescription}>
          Descripcion: ksdalkamdklmdsalfkmdsflkdsamfdslkfmnlsdkfmdslkfmladskfmladkmfladkmfladkmfldskmfklmekdfnafkefnoewqfmklwesmdfloawsenfkaewmflkds
        </Text>
        <Button title="Añadir al carrito" color="#f31f35" onPress={() => {}} />
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
  productDetails: {
    marginTop: 20,
  },
  productTitle: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  productPrice: {
    fontSize: 20,
    marginVertical: 10,
  },
  productDescription: {
    marginBottom: 20,
  },
});
