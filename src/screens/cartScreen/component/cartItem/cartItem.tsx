import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';
import { IProductDataType } from '@screens/homeScreen/redux/home.initialState';

interface ICartItemProps {
  item: IProductDataType;
  quantity: number;
  onAdd: () => void;
  onRemove: () => void;
  onRemovePress: () => void;
}

export const CartItem = ({
  item,
  quantity,
  onAdd,
  onRemove,
  onRemovePress,
}: ICartItemProps) => (
  <View style={styles.itemRow}>
    <Image source={{ uri: item.image }} style={styles.image} />
    <View style={styles.detailsColumn}>
      <Text style={styles.name}>{item.name}</Text>
      <Text style={styles.price}>₹{item.price}</Text>
      <View style={styles.controls}>
        <TouchableOpacity
          onPress={onRemove}
          disabled={quantity <= 1}
          style={[
            styles.controlButton,
            quantity <= 1 && styles.disabledButton,
          ]}>
          <Text style={styles.controlText}>-</Text>
        </TouchableOpacity>
        <Text style={styles.qty}>{quantity}</Text>
        <TouchableOpacity
          onPress={onAdd}
          disabled={quantity >= 10}
          style={[
            styles.controlButton,
            quantity >= 10 && styles.disabledButton,
          ]}>
          <Text style={styles.controlText}>+</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity onPress={onRemovePress}>
        <Text style={styles.removeText}>Remove</Text>
      </TouchableOpacity>
    </View>
  </View>
);

const styles = StyleSheet.create({
  controlButton: {
    backgroundColor: '#000',
    borderRadius: 8,
    marginHorizontal: 4,
    padding: 8,
  },
  controlText: {
    color: '#FEEF01',
    fontSize: 18,
    fontWeight: 'bold',
  },
  controls: {
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 8,
  },
  detailsColumn: {
    flex: 1,
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor: '#808080',
  },
  image: {
    borderRadius: 8,
    height: 100,
    marginRight: 12,
    width: 100,
  },
  itemRow: {
    backgroundColor: '#fff',
    borderRadius: 12,
    flexDirection: 'row',
    marginBottom: 24,
    padding: 12,
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
  },
  price: {
    color: '#8B0000',
    fontSize: 16,
    marginVertical: 4,
  },
  qty: {
    fontSize: 18,
    fontWeight: '600',
    marginHorizontal: 6,
  },
  removeText: {
    color: '#FF0000',
    fontSize: 14,
    marginTop: 8,
    textDecorationLine: 'underline',
  },
});
