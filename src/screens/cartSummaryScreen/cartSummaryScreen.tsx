import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
} from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { IProductDataType } from '../homeScreen/redux/home.initialState';
import { useCartHook } from 'src/hooks/useCartHook';
import { selectCartItemData } from '../productDetailsScreen/redux/product.api.selector';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { SUCCESS_SCREEN } from 'src/utils/routesConstants';
import { setCartItem } from '../productDetailsScreen/redux/product.api.slice';

export const CartSummaryScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();
  const cartData = useSelector(selectCartItemData);
  const { getItemCount } = useCartHook();

  const [paymentMethod, setPaymentMethod] = useState('Cash on Delivery');

  const totalPrice =
    cartData?.reduce((acc, item) => acc + item.price * getItemCount(item), 0) ||
    0;
  const shipping = 50;
  const vat = totalPrice * 0.15;
  const totalAmount = totalPrice + shipping + vat;

  const isCartEmpty = !cartData || cartData.length === 0;

  const renderItem = ({ item }: { item: IProductDataType }) => {
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

  const onPlaceOrderPress = () => {
    dispatch(setCartItem({ data: undefined }));
    navigation.navigate(SUCCESS_SCREEN);
  };

  return (
    <>
      <View style={styles.container}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
        {!isCartEmpty && (
          <>
            <View style={styles.paymentMethodContainer}>
              <View style={styles.paymentHeaderRow}>
                <Text style={styles.paymentMethodLabel}>Payment Method</Text>
                <TouchableOpacity
                  onPress={() => {
                    /* Payment switch logic */
                  }}>
                  <Text style={styles.changeText}>Change</Text>
                </TouchableOpacity>
              </View>
              <Text style={styles.selectedMethod}>{paymentMethod}</Text>
            </View>

            <View style={styles.priceDetailsContainer}>
              <Text style={styles.priceHeader}>Order Summary</Text>
              <View style={styles.priceRow}>
                <Text>Subtotal</Text>
                <Text>₹{totalPrice.toFixed(2)}</Text>
              </View>
              <View style={styles.priceRow}>
                <Text>Shipping Charges</Text>
                <Text>₹{shipping}</Text>
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
          </>
        )}
        <TouchableOpacity
          style={[styles.checkoutButton, isCartEmpty && styles.disabledButton]}
          disabled={isCartEmpty}
          onPress={onPlaceOrderPress}>
          <Text style={styles.checkoutText}>Place order</Text>
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
  changeText: {
    color: '#0000EE',
    fontWeight: '600',
    textDecorationLine: 'underline',
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
  list: {
    paddingTop: 12,
  },
  name: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
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
  price: {
    color: '#000',
    fontSize: 16,
    fontWeight: '600',
  },
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
  secondContainer: {
    backgroundColor: '#FEEF0190',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  selectedMethod: {
    color: '#333',
    fontSize: 16,
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
