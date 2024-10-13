import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

export default function Help({ navigation }: { navigation: any }) {
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);

  const toggleQuestion = (question: string) => {
    setSelectedQuestion(selectedQuestion === question ? null : question);
  };

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
      <Text style={styles.sectionTitle}>Ayuda</Text>
      <View style={styles.faqContainer}>
        <TouchableOpacity style={styles.questionBox} onPress={() => toggleQuestion('q1')}>
          <Text style={styles.question}>¿Qué es esta app?</Text>
          <Icon name={selectedQuestion === 'q1' ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#000" />
        </TouchableOpacity>
        {selectedQuestion === 'q1' && (
          <Text style={styles.answer}>Esta app es un marketplace para donar alimentos y acumular puntos que puedes canjear por recompensas.</Text>
        )}

        <TouchableOpacity style={styles.questionBox} onPress={() => toggleQuestion('q2')}>
          <Text style={styles.question}>¿Cómo puedo donar?</Text>
          <Icon name={selectedQuestion === 'q2' ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#000" />
        </TouchableOpacity>
        {selectedQuestion === 'q2' && (
          <Text style={styles.answer}>Puedes seleccionar los productos disponibles en el marketplace y realizar una donación a una comunidad vulnerable.</Text>
        )}

        <TouchableOpacity style={styles.questionBox} onPress={() => toggleQuestion('q3')}>
          <Text style={styles.question}>¿Cómo acumulo puntos?</Text>
          <Icon name={selectedQuestion === 'q3' ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#000" />
        </TouchableOpacity>
        {selectedQuestion === 'q3' && (
          <Text style={styles.answer}>Cada vez que realizas una donación, recibes puntos que puedes utilizar para obtener recompensas dentro de la app.</Text>
        )}

        <TouchableOpacity style={styles.questionBox} onPress={() => toggleQuestion('q4')}>
          <Text style={styles.question}>¿Dónde puedo ver mis recompensas?</Text>
          <Icon name={selectedQuestion === 'q4' ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#000" />
        </TouchableOpacity>
        {selectedQuestion === 'q4' && (
          <Text style={styles.answer}>Puedes ver tus recompensas acumuladas en la sección "Mis Recompensas" dentro de la app.</Text>
        )}

        <TouchableOpacity style={styles.questionBox} onPress={() => toggleQuestion('q5')}>
          <Text style={styles.question}>¿Puedo compartir mis donaciones?</Text>
          <Icon name={selectedQuestion === 'q5' ? "chevron-up-outline" : "chevron-down-outline"} size={20} color="#000" />
        </TouchableOpacity>
        {selectedQuestion === 'q5' && (
          <Text style={styles.answer}>Sí, puedes compartir tus donaciones en redes sociales usando las opciones de compartir disponibles después de cada donación.</Text>
        )}
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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  faqContainer: {
    marginBottom: 15,
  },
  questionBox: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f0f0f0',
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
  },
  question: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  answer: {
    fontSize: 16,
    marginBottom: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    backgroundColor: '#e8e8e8',
    borderRadius: 5,
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
