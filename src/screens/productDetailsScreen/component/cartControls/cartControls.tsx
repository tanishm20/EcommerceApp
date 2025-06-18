import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';

interface ICartControlsProps {
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
}

export const CartControls = ({
  quantity,
  onAdd,
  onRemove,
}: ICartControlsProps) => (
  <View style={styles.addToCartRow}>
    <Text style={styles.addToCartLabel}>Add to cart</Text>
    <View style={styles.capsuleControls}>
      <TouchableOpacity
        onPress={onRemove}
        style={getCartButtonStyle('left', quantity === 0)}
        disabled={quantity === 0}>
        <Text style={styles.cartText}>-</Text>
      </TouchableOpacity>
      <Text style={styles.qty}>{quantity}</Text>
      <TouchableOpacity
        onPress={onAdd}
        style={getCartButtonStyle('right', quantity === 10)}
        disabled={quantity === 10}>
        <Text style={styles.cartText}>+</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const getCartButtonStyle = (
  side: 'left' | 'right',
  disabled: boolean,
): ViewStyle => ({
  backgroundColor: disabled ? '#808080' : '#000',
  borderTopLeftRadius: side === 'left' ? 16 : 0,
  borderBottomLeftRadius: side === 'left' ? 16 : 0,
  borderTopRightRadius: side === 'right' ? 16 : 0,
  borderBottomRightRadius: side === 'right' ? 16 : 0,
  paddingHorizontal: 12,
  paddingVertical: 6,
});

const styles = StyleSheet.create({
  addToCartLabel: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  addToCartRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 24,
  },

  capsuleControls: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 6,
  },
  cartText: {
    color: '#FEEF01',
    fontSize: 24,
  },
  qty: {
    color: '#000',
    fontSize: 18,
    marginHorizontal: 12,
  },
});
