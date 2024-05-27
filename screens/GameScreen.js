import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet, Alert } from 'react-native';
import MapView, { Marker, Polyline } from 'react-native-maps';
import * as Location from 'expo-location';
import { db } from '../firebaseConfig';
import { collection, getDocs } from 'firebase/firestore';

const GameScreen = ({ navigation }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false); // Nuevo estado para controlar si se muestra la respuesta
  const [totalScore, setTotalScore] = useState(0); // Nuevo estado para acumular la puntuación

  useEffect(() => {
    const fetchQuestions = async () => {
      const querySnapshot = await getDocs(collection(db, 'questions'));
      const data = querySnapshot.docs.map(doc => doc.data());
      setQuestions(data);
    };
    fetchQuestions();
  }, []);

  const handleMapPress = (e) => {
    setSelectedLocation(e.nativeEvent.coordinate);
  };

  const checkAnswer = () => {
    if (!selectedLocation) return;
    setShowAnswer(true); // Mostrar la respuesta después de verificar
    const question = questions[currentQuestion];
    const distance = getDistance(
      question.lat,
      question.lon,
      selectedLocation.latitude,
      selectedLocation.longitude
    );
    const score = calculateScore(distance);
    setTotalScore((prev) => prev + score);
    Alert.alert(`Distancia: ${distance} km\nPuntuación: ${score}`);
  };

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    const a =
      0.5 - Math.cos(dLat) / 2 +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      (1 - Math.cos(dLon)) / 2;
    return R * 2 * Math.asin(Math.sqrt(a));
  };

  const calculateScore = (distance) => {
    if (distance <= 10) return 500;
    if (distance <= 100) return 400;
    if (distance <= 200) return 300;
    if (distance <= 300) return 200;
    if (distance <= 400) return 100;
    return 0;
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedLocation(null); // Limpiar la ubicación seleccionada
      setShowAnswer(false); // Ocultar la respuesta para la nueva pregunta
    } else {
      navigation.navigate('Result', { totalScore }); // Navegar a la pantalla de resultados y pasar la puntuación total
    }
  };

  if (questions.length === 0) {
    return (
      <View style={styles.container}>
        <Text>Cargando preguntas...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.question}>{questions[currentQuestion].title}</Text>
      <MapView style={styles.map} onPress={handleMapPress}>
        {selectedLocation && <Marker coordinate={selectedLocation} />}
        {showAnswer && questions[currentQuestion] && (
          <Marker coordinate={{ latitude: questions[currentQuestion].lat, longitude: questions[currentQuestion].lon }} pinColor="green" />
        )}
        {showAnswer && selectedLocation && questions[currentQuestion] && (
          <Polyline
            coordinates={[
              { latitude: selectedLocation.latitude, longitude: selectedLocation.longitude },
              { latitude: questions[currentQuestion].lat, longitude: questions[currentQuestion].lon }
            ]}
            strokeColor="#000"
            strokeWidth={3}
          />
        )}
      </MapView>
      {showAnswer && (
        <Text>Distancia: {getDistance(
          questions[currentQuestion].lat,
          questions[currentQuestion].lon,
          selectedLocation.latitude,
          selectedLocation.longitude
        )} km</Text>
      )}
      <Button title="Comprobar Resultado" onPress={checkAnswer} />
      <Button title="Siguiente Pregunta" onPress={nextQuestion} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  question: {
    fontSize: 20,
    marginBottom: 10,
  },
  map: {
    flex: 1,
    marginBottom: 10,
  },
});

export default GameScreen;
