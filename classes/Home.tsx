import React from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons"; 

export default function Home({ navigation }: any) {
  return (
    <View style={styles.container}>
      <View style={styles.search}>
        <Icon name="search-outline" size={24} style={styles.icon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#878380"
        />
        <Icon name="mic-outline" size={24} style={styles.icon} />
      </View>

      <View style={styles.recommended}>
        <View style={styles.recommendedTop}>
          <Text style={styles.title}>Recomendado</Text>
          <Text style={styles.text}>más</Text>
        </View>
        <View style={styles.recommendedBottom}>
          <Icon
            name="chevron-back-outline"
            size={30}
            style={styles.arrowIcon}
          />
          <View style={styles.recommendedCard}></View>
          <Icon
            name="chevron-forward-outline"
            size={30}
            style={styles.arrowIcon}
          />
        </View>
      </View>

      <View style={styles.products}>
        <Text style={styles.title}>Productos</Text>
        <View style={styles.productsGrid}>
          {Array.from({ length: 4 }).map((_, index) => (
            <View key={index} style={styles.productCard}>
              <Text>Producto</Text>
              <Text>$99.99</Text>
            </View>
          ))}
        </View>
      </View>

      <View style={styles.tabBar}>
        <TouchableOpacity onPress={() => navigation.navigate("ProductsLayout")}>
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
  search: {
    flexDirection: "row",
    alignItems: "center",
    margin: 10,
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
  },
  recommendedTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#000",
  },
  text: {
    fontSize: 15,
    color: "#878380",
  },
  recommendedBottom: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#EDEEEF",
    borderRadius: 10,
    padding: 10,
  },
  arrowIcon: {
    padding: 10,
  },
  recommendedCard: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-around",
  },
  products: {
    paddingHorizontal: 20,
  },
  productsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  productCard: {
    width: "45%",
    backgroundColor: "#EDEEEF",
    padding: 20,
    borderRadius: 10,
    alignItems: "center",
    marginBottom: 10,
  },
  tabBar: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: "#EDEEEF",
  },
  homeIconContainer: {
    backgroundColor: "#f31f35",
    padding: 10,
    borderRadius: 50,
  },
});
