import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { IProductDataType } from 'src/screens/homeScreen/redux/home.initialState';

interface ICartItemProps {
  item: IProductDataType;
  getItemCount: (item: IProductDataType) => number;
}
export const CartItem = ({ item, getItemCount }: ICartItemProps) => {
  const quantity = getItemCount(item);
  const total = item.price * quantity;

  return (
    <View style={styles.itemRow}>
      <View style={styles.leftColumn}>
        <Image source={{ uri: item.image }} style={styles.productImage} />
        <View style={styles.productText}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.quantity}>
            x {quantity} item{quantity > 1 ? 's' : ''}
          </Text>
        </View>
      </View>
      <Text style={styles.price}>₹{total.toFixed(2)}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  itemRow: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
    padding: 16,
  },
  leftColumn: {
    alignItems: 'center',
    flexDirection: 'row',
    flex: 1,
  },

  name: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },

  price: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
  productImage: {
    backgroundColor: '#ccc',
    borderRadius: 8,
    height: 60,
    marginRight: 12,
    width: 60,
  },
  productText: {
    flexShrink: 1,
  },
  quantity: {
    color: '#666',
    fontSize: 14,
    marginTop: 4,
  },
});
