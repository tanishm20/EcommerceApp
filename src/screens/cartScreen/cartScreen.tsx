import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Modal,
  Pressable,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IProductDataType } from '../homeScreen/redux/home.initialState';
import { useCartHook } from 'src/hooks/useCartHook';
import { selectCartItemData } from '../productDetailsScreen/redux/product.api.selector';
import { setCartItem } from '../productDetailsScreen/redux/product.api.slice';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const CartScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartItemData);
  const { addToCart, removeFromCart, getItemCount } = useCartHook();
  const totalPrice =
    cartData?.reduce((acc, item) => acc + item.price * getItemCount(item), 0) ||
    0;
  const shipping = 50;
  const vat = 0.15 * totalPrice;
  const totalAmount = totalPrice + shipping + vat;
  const [modalVisible, setModalVisible] = useState(false);
  const [itemToRemove, setItemToRemove] = useState<IProductDataType>();

  const confirmRemove = () => {
    if (itemToRemove) {
      const updatedCartData = cartData?.filter(
        item => item.id !== itemToRemove.id,
      );
      dispatch(setCartItem({ data: updatedCartData }));
      setItemToRemove(undefined);
    }
    setModalVisible(false);
  };

  const renderItem = ({ item }: { item: IProductDataType }) => {
    const quantity = getItemCount(item);
    return (
      <View style={styles.itemRow}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <View style={styles.detailsColumn}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.price}>₹{item.price}</Text>
          <View style={styles.controls}>
            <TouchableOpacity
              onPress={() => removeFromCart(item)}
              disabled={quantity <= 1}
              style={[
                styles.controlButton,
                quantity <= 1 && styles.disabledButton,
              ]}>
              <Text style={styles.controlText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => addToCart(item)}
              disabled={quantity >= 10}
              style={[
                styles.controlButton,
                quantity >= 10 && styles.disabledButton,
              ]}>
              <Text style={styles.controlText}>+</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              setItemToRemove(item);
              setModalVisible(true);
            }}>
            <Text style={styles.removeText}>Remove</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  const isCartEmpty = !cartData || cartData.length === 0;
  const onBackClick = () => {
    navigation.goBack();
  };

  const modal = () => {
    return (
      <Modal transparent visible={modalVisible} animationType="fade">
        <View style={styles.modalBackdrop}>
          <View style={styles.modalContent}>
            <Text style={styles.modalText}>
              Do you want to remove this item?
            </Text>
            <View style={styles.modalButtons}>
              <Pressable onPress={confirmRemove} style={styles.modalConfirm}>
                <Text style={styles.modalButtonText}>Yes</Text>
              </Pressable>
              <Pressable
                onPress={() => setModalVisible(false)}
                style={styles.modalCancel}>
                <Text style={styles.modalButtonText}>Cancel</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    );
  };
  return (
    <>
      <View style={styles.container}>
        {modal()}
        <TouchableOpacity activeOpacity={1} onPress={onBackClick}>
          <Text style={styles.backButton}>{'← Back'}</Text>
        </TouchableOpacity>
        {isCartEmpty ? (
          <Text style={styles.emptyText}>
            No items in cart. Add some items to checkout.
          </Text>
        ) : (
          <FlatList
            showsVerticalScrollIndicator={false}
            data={cartData}
            keyExtractor={item => item.id}
            renderItem={renderItem}
            contentContainerStyle={styles.list}
          />
        )}
      </View>
      <View style={styles.secondContainer}>
        {!isCartEmpty ? (
          <View style={styles.priceDetailsContainer}>
            <Text style={styles.priceHeader}>Price Details</Text>
            <View style={styles.priceRow}>
              <Text>Total Price</Text>
              <Text>₹{totalPrice.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text>Shipping Charges</Text>
              <Text>₹{shipping}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text>VAT (15%)</Text>
              <Text>₹{vat.toFixed(2)}</Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total Amount</Text>
              <Text style={styles.totalLabel}>₹{totalAmount.toFixed(2)}</Text>
            </View>
          </View>
        ) : null}
        <TouchableOpacity
          style={[styles.checkoutButton, isCartEmpty && styles.disabledButton]}
          disabled={isCartEmpty}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  backButton: {
    fontSize: 18,
    fontWeight: '600',
  },
  checkoutButton: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 16,
  },
  checkoutText: {
    color: '#FEEF01',
    fontSize: 20,
    fontWeight: 'bold',
  },
  container: {
    backgroundColor: '#FEEF0190',
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
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

  emptyText: {
    color: '#333',
    fontSize: 18,
    fontStyle: 'italic',
    marginTop: 48,
    textAlign: 'center',
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
  list: {
    paddingTop: 12,
  },
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: '#00000099',
    flex: 1,
    justifyContent: 'center',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancel: {
    alignItems: 'center',
    backgroundColor: '#808080',
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    padding: 12,
  },
  modalConfirm: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    padding: 12,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
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
  priceDetailsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    borderWidth: 1,
    marginBottom: 4,
    marginTop: 12,
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
  secondContainer: {
    backgroundColor: '#FEEF0190',
    paddingHorizontal: 16,
    paddingTop: 16,
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
