import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

interface IPriceSummarySectionProps {
  totalPrice: number;
  shipping: number;
  vat: number;
  totalAmount: number;
}

export const PriceSummarySection = ({
  totalPrice,
  shipping,
  vat,
  totalAmount,
}: IPriceSummarySectionProps) => {
  return (
    <View style={styles.priceDetailsContainer}>
      <Text style={styles.priceHeader}>Order Summary</Text>
      <View style={styles.priceRow}>
        <Text>Subtotal</Text>
        <Text>₹{totalPrice.toFixed(2)}</Text>
      </View>
      <View style={styles.priceRow}>
        <Text>Shipping Charges</Text>
        <Text>₹{shipping.toFixed(2)}</Text>
      </View>
      <View style={styles.priceRow}>
        <Text>Vat and Tax (15%)</Text>
        <Text>₹{vat.toFixed(2)}</Text>
      </View>
      <View style={styles.separator} />
      <View style={styles.priceRow}>
        <Text style={styles.totalLabel}>Total</Text>
        <Text style={styles.totalLabel}>₹{totalAmount.toFixed(2)}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  priceDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16,
  },
  priceHeader: {
    fontSize: 18,
    fontWeight: '700',
    marginBottom: 12,
  },
  priceRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  separator: {
    borderBottomColor: '#ccc',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 12,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
