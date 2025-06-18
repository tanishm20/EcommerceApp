import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation, ParamListBase } from '@react-navigation/native';
import { HOME_SCREEN } from '@utils/routesConstants';

export const SuccessScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleGoHome = () => {
    navigation.navigate(HOME_SCREEN); // update if your route key is different
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={{
            uri: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTU91JaXzsfCPs_UGGoepTlJlH9IzplqieM6g&s',
          }}
          style={styles.checkmark}
        />
        <Text style={styles.title}>Order Placed!</Text>
        <Text style={styles.subtitle}>
          Thank you for your purchase. Your order was successful.
        </Text>
      </View>

      <TouchableOpacity style={styles.button} onPress={handleGoHome}>
        <Text style={styles.buttonText}>Back to Home</Text>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    borderRadius: 12,
    paddingHorizontal: 32,
    paddingVertical: 14,
  },
  buttonText: {
    color: '#FEEF01',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 32,
    padding: 32,
  },
  checkmark: {
    height: 80,
    marginBottom: 24,
    width: 80,
  },
  container: {
    alignItems: 'center',
    backgroundColor: '#FEEF0190',
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 24,
  },
  subtitle: {
    color: '#444',
    fontSize: 16,
    lineHeight: 22,
    textAlign: 'center',
  },
  title: {
    color: '#000',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 12,
  },
});
