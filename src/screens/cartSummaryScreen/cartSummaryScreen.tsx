import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import { useCartSummaryScreen } from './useCartSummaryScreen';
import { BackComponent } from 'src/common/backComponent';
import { PriceSummarySection } from './component/priceSummary/priceSummary';
import { CartItem } from './component/cartItem/cartItem';
import { PaymentMethodSection } from './component/paymentMethod/paymentMethod';

export const CartSummaryScreen = () => {
  const {
    paymentMethod,
    totalAmount,
    isCartEmpty,
    onPlaceOrderPress,
    getItemCount,
    cartData,
    totalPrice,
    shipping,
    vat,
  } = useCartSummaryScreen();

  if (isCartEmpty) {
    return (
      <View style={styles.container}>
        <BackComponent />
        <Text style={styles.emptyText}>
          No items in cart. Add some items to checkout.
        </Text>
      </View>
    );
  }

  return (
    <>
      <View style={styles.container}>
        <BackComponent />
        <FlatList
          showsVerticalScrollIndicator={false}
          data={cartData}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <CartItem item={item} getItemCount={getItemCount} />
          )}
          contentContainerStyle={styles.list}
        />
      </View>

      <View style={styles.secondContainer}>
        <PaymentMethodSection paymentMethod={paymentMethod} />
        <PriceSummarySection
          totalPrice={totalPrice}
          shipping={shipping}
          vat={vat}
          totalAmount={totalAmount}
        />
        <TouchableOpacity
          style={styles.checkoutButton}
          onPress={onPlaceOrderPress}>
          <Text style={styles.checkoutText}>Place order</Text>
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
  secondContainer: {
    backgroundColor: '#FEEF0190',
    paddingBottom: 16,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
});
