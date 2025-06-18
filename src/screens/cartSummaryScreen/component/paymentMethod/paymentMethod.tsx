import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const PaymentMethodSection = ({
  paymentMethod,
}: {
  paymentMethod: string;
}) => {
  const onPaymentMethodChange = () => {
    // TO DO
  };
  return (
    <View style={styles.paymentMethodContainer}>
      <View style={styles.paymentHeaderRow}>
        <Text style={styles.paymentMethodLabel}>Payment Method</Text>
        <TouchableOpacity onPress={onPaymentMethodChange}>
          <Text style={styles.changeText}>Change</Text>
        </TouchableOpacity>
      </View>
      <Text style={styles.selectedMethod}>{paymentMethod}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  changeText: {
    color: '#0000EE',
    fontWeight: '600',
    textDecorationLine: 'underline',
  },
  paymentHeaderRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  paymentMethodContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  paymentMethodLabel: {
    fontSize: 16,
    fontWeight: '600',
  },
  selectedMethod: {
    color: '#333',
    fontSize: 16,
  },
});
