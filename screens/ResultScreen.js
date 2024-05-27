// ResultScreen.js
import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';

const ResultScreen = ({ route, navigation }) => {
  const { totalScore } = route.params;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Resultado Final</Text>
      <Text style={styles.score}>Puntuación: {totalScore}</Text>
      <Button
        title="Volver al Menú Principal"
        onPress={() => navigation.navigate('Main')}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  score: {
    fontSize: 20,
    marginBottom: 20,
  },
});

export default ResultScreen;
