import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Reviews({ navigation }: { navigation: any }) {
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
      <Text style={styles.sectionTitle}>Reseñas</Text>
      <View style={styles.reviewContainer}>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>“Me encanta la idea de poder ayudar a los demás mientras gano recompensas. Muy intuitiva y fácil de usar.” - Usuario 1
          </Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
          </View>
        </View>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>“La app es excelente para hacer donaciones. Me gusta cómo puedo ver el impacto que tienen mis donaciones.” - Usuario 2
          </Text>
          <View style={styles.starsContainer}>
            {[...Array(4)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
          </View>
        </View>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>“Interfaz muy clara y funcional. Las recompensas son un buen incentivo para seguir ayudando.” - Usuario 3
          </Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
          </View>
        </View>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>“Muy buena aplicación, aunque me gustaría ver más opciones de donación.” - Usuario 4
          </Text>
          <View style={styles.starsContainer}>
            {[...Array(4)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
          </View>
        </View>
        <View style={styles.reviewBox}>
          <Text style={styles.reviewText}>“Me gusta mucho la idea, pero podría mejorar en cuanto a velocidad.” - Usuario 5
          </Text>
          <View style={styles.starsContainer}>
            {[...Array(3)].map((_, index) => (
              <Icon key={index} name="star" size={20} color="#FFD700" />
            ))}
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  backButton: {
    position: 'absolute',
    top: 20,
    left: 20,
    zIndex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    textAlign: 'center',
  },
  reviewContainer: {
    marginBottom: 15,
  },
  reviewBox: {
    backgroundColor: '#f9f9f9',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  reviewText: {
    fontSize: 16,
    fontStyle: 'italic',
    marginBottom: 10,
  },
  starsContainer: {
    flexDirection: 'row',
  },
  spacer: {
    marginTop: 42,
  },
  backContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  backIcon: {
    marginBottom: 4,
  },
  backtext: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 8,
    paddingBottom: 6,
    color: '#5e5e5e',
  },
});
