import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { useCartScreen } from './useCartScreen';
import { RemoveItemModal } from '@common/removeItemModal';
import { CartItem } from 'src/screens/cartScreen/component/cartItem/cartItem';
import { BackComponent } from 'src/common/backComponent';

export const CartScreen = () => {
  const {
    confirmRemove,
    getItemCount,
    onRemoveFromCart,
    onAddToCart,
    onRemovePress,
    modalVisible,
    isCartEmpty,
    setModalVisible,
    cartData,
    onCheckoutPress,
    getTotalQuantity,
  } = useCartScreen();

  return (
    <>
      <View style={styles.container}>
        <RemoveItemModal
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          confirmRemove={confirmRemove}
        />
        <BackComponent />
        {isCartEmpty ? (
          <Text style={styles.emptyText}>
            No items in cart. Add some items to checkout.
          </Text>
        ) : (
          <FlatList
            data={cartData}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                quantity={getItemCount(item)}
                onAdd={onAddToCart(item)}
                onRemove={onRemoveFromCart(item)}
                onRemovePress={onRemovePress(item)}
              />
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.list}
          />
        )}
      </View>

      <View style={styles.secondContainer}>
        {!isCartEmpty && (
          <View style={styles.priceDetailsContainer}>
            <Text style={styles.priceHeader}>Total Order Summary</Text>
            <View style={styles.priceRow}>
              <Text>Total Items</Text>
              <Text>{cartData?.length || 0}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text>Total Quantity</Text>
              <Text>{getTotalQuantity}</Text>
            </View>
          </View>
        )}
        <TouchableOpacity
          style={[styles.checkoutButton, isCartEmpty && styles.disabledButton]}
          onPress={onCheckoutPress}
          disabled={isCartEmpty}>
          <Text style={styles.checkoutText}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
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

  list: {
    paddingTop: 12,
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
  secondContainer: {
    backgroundColor: '#FEEF0190',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
