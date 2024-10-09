import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Dimensions,
  ScrollView,
} from "react-native";
import { Product } from "../model/ProductModel";
import { User } from "../model/UserModel";
import { getFeaturedProducts } from "../api/product/featured.product.service";
import { getUser } from "../api/user/user.service";
import Icon from "react-native-vector-icons/Ionicons";

const screenWidth = Dimensions.get("window").width;

export default function Home({ navigation }: any) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [currentProductIndex, setCurrentProductIndex] = useState(0);
  const [userData, setUserData] = useState<User[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      let products;
      let user;
      try {
        products = await getFeaturedProducts();
        user = await getUser();
        setProducts(products);
        setUserData(user);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleNextProduct = () => {
    setCurrentProductIndex((prevIndex) =>
        prevIndex === products.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePreviousProduct = () => {
    setCurrentProductIndex((prevIndex) =>
        prevIndex === 0 ? products.length - 1 : prevIndex - 1
    );
  };

  return (
      <View style={styles.container}>
        <View style={styles.searchContainer}>
          <View style={styles.search}>
            <Icon name="search-outline" size={24} style={styles.icon} />
            <TextInput
                style={styles.searchInput}
                placeholder="Search"
                placeholderTextColor="#878380"
            />
            <Icon name="mic-outline" size={24} style={styles.icon} />
          </View>
        </View>

        {/* Welcome Section */}
        <View style={styles.userSection}>
          {userData.length > 0 ? (
              userData.map((user, index) => (
                  <View key={index} style={styles.userSection}>
                    <Text style={styles.welcomeText}>Bienvenid@,</Text>
                    <Text style={styles.welcomeText}>{user.email}</Text>
                    <View style={styles.pointsBarContainer}>
                      <View
                          style={[
                            styles.pointsBar,
                            {
                              backgroundColor:
                                  user.points_balance > 0 ? "#0fa917" : "#D3D3D3",
                              width: `${Math.min(user.points_balance, 100)}%`,
                            },
                          ]}
                      />
                    </View>
                    <Text style={styles.pointsText}>
                      Puntos acumulados: {user.points_balance} puntos
                    </Text>
                  </View>
              ))
          ) : (
              <View>
                <Text style={styles.welcomeText}>Bienvenido, identifícate</Text>
              </View>
          )}
        </View>

        {/* Recommended Section */}
        <View style={styles.recommended}>
          <View style={styles.recommendedTop}>
            <Text style={styles.title}>Recomendado</Text>
          </View>
          {loading ? (
              <ActivityIndicator
                  size="large"
                  color="#0000ff"
                  style={styles.activityIndicator}
              />
          ) : products.length === 0 ? (
              <View>
                <Text>No hay productos recomendados disponibles.</Text>
              </View>
          ) : (
              <View style={styles.carouselWrapper}>
                <TouchableOpacity
                    style={[styles.chevronContainer, styles.leftChevron]}
                    onPress={handlePreviousProduct}
                >
                  <Icon name="chevron-back-outline" size={30} color="#fff" />
                </TouchableOpacity>
                <Image
                    source={{ uri: products[currentProductIndex].image_url }}
                    style={styles.fullWidthImage}
                />
                <View style={styles.overlay}>
                  <Text style={styles.overlayText}>
                    {products[currentProductIndex].name}
                  </Text>
                </View>
                <TouchableOpacity
                    style={[styles.chevronContainer, styles.rightChevron]}
                    onPress={handleNextProduct}
                >
                  <Icon name="chevron-forward-outline" size={30} color="#fff" />
                </TouchableOpacity>
              </View>
          )}
        </View>

        {/* Products Section */}
        <ScrollView style={styles.products}>
          <Text style={styles.title}>Donaciones Destacadas</Text>
          <View style={styles.productsGrid}>
            {products.length > 0 ? (
                products.map((product) => (
                    <View key={product.id} style={styles.productCard}>
                      <Image
                          source={{ uri: product.image_url }}
                          style={styles.productImage}
                      />
                      <View style={styles.productOverlay}>
                        <Text style={styles.productOverlayText}>{product.name}</Text>
                      </View>
                    </View>
                ))
            ) : (
                <Text>No hay productos disponibles por el momento.</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.tabBar}>
          <TouchableOpacity onPress={() => navigation.navigate("Donaciones")}>
            <Icon name="grid-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Rewards")}>
            <Icon name="star-outline" size={30} />
          </TouchableOpacity>
          <View style={styles.homeIconContainer}>
            <Icon name="home-outline" size={30} color="#fff" />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
            <Icon name="cart-outline" size={30} />
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Profile")}>
            <Icon name="person-outline" size={30} />
          </TouchableOpacity>
        </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    justifyContent: "space-between",
  },
  searchContainer: {
    marginTop: 75,
    paddingHorizontal: 15,
  },
  search: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEEEF",
    borderRadius: 10,
    paddingHorizontal: 10,
  },
  searchInput: {
    flex: 1,
    height: 40,
    paddingHorizontal: 10,
    backgroundColor: "#EDEEEF",
    borderRadius: 10,
    color: "#000",
  },
  icon: {
    padding: 10,
    color: "#878380",
  },
  recommended: {
    paddingHorizontal: 20,
    marginBottom: 0,
  },
  recommendedTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  carouselWrapper: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    position: "relative",
  },
  chevronContainer: {
    position: "absolute",
    top: "50%",
    zIndex: 2,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    borderRadius: 15,
    padding: 5,
  },
  leftChevron: {
    left: 10,
  },
  rightChevron: {
    right: 10,
  },
  fullWidthImage: {
    width: screenWidth - 40,
    height: 200,
    resizeMode: "cover",
    borderRadius: 10,
  },
  overlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 5,
  },
  overlayText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 12,
  },
  products: {
    paddingHorizontal: 20,
    marginTop: 20,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "45%",
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 12,
    overflow: "hidden",
  },
  productImage: {
    width: "100%",
    height: 120,
    resizeMode: "cover",
  },
  productOverlay: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
    padding: 2,
  },
  productOverlayText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  productPrice: {
    fontSize: 12,
    color: "#555",
    textAlign: "center",
    marginTop: 5,
  },
  userSection: {
    marginVertical: 10,
    paddingHorizontal: 10,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 5,
  },
  pointsBarContainer: {
    width: "100%",
    height: 10,
    backgroundColor: "#EDEEEF",
    borderRadius: 5,
    marginTop: 10,
  },
  pointsBar: {
    height: "100%",
    borderRadius: 5,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    paddingVertical: 28,
    borderTopWidth: 1,
    borderTopColor: "#EDEEEF",
  },
  homeIconContainer: {
    backgroundColor: "#f31f35",
    padding: 10,
    borderRadius: 50,
  },
  activityIndicator: {
    marginTop: 100,
  },
  pointsText: {
    fontSize: 16,
    marginTop: 8,
  },
});
