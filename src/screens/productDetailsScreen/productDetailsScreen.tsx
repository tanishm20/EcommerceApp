import React from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import {
  ParamListBase,
  RouteProp,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import { IProductDataType } from '../homeScreen/redux/home.initialState';
import { CART_SCREEN } from 'src/utils/routesConstants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useCartHook } from 'src/hooks/useCartHook';

export const ProductDetailsScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const {
    params: { product },
  } =
    useRoute<
      RouteProp<{
        params: { product: IProductDataType };
      }>
    >() ?? {};
  const { addToCart, removeFromCart, getTotalItems, getItemCount } =
    useCartHook();
  const quantity = getItemCount(product);
  const onBackClick = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity activeOpacity={1} onPress={onBackClick}>
        <Text style={styles.backButton}>{'← Back'}</Text>
      </TouchableOpacity>
      <View style={styles.container}>
        <Image source={{ uri: product.image }} style={styles.image} />

        <Text style={styles.name}>{product.name}</Text>
        <Text style={styles.price}>₹{product.price}</Text>
        {product.tags && product.tags.length > 0 && (
          <View style={styles.tagContainer}>
            {product.tags.map(tag => (
              <View key={tag} style={styles.tagBadge}>
                <Text style={styles.tagText}>{tag}</Text>
              </View>
            ))}
          </View>
        )}
        <Text style={[styles.addToCartLabel, styles.marginStyle]}>
          Description
        </Text>
        <Text style={styles.description}>
          {product.description || 'No description available.'}
        </Text>

        <View style={styles.addToCartRow}>
          <Text style={styles.addToCartLabel}>Add to cart</Text>
          <View style={styles.capsuleControls}>
            <TouchableOpacity
              onPress={() => removeFromCart(product)}
              style={getInnerLeftButtonStyle(quantity === 0)}
              disabled={quantity === 0}>
              <Text style={styles.cartText}>-</Text>
            </TouchableOpacity>
            <Text style={styles.qty}>{quantity}</Text>
            <TouchableOpacity
              onPress={() => addToCart(product)}
              style={getInnerRightButtonStyle(quantity === 10)}
              disabled={quantity === 10}>
              <Text style={styles.cartText}>+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={styles.cartButton}
        onPress={() => navigation.navigate(CART_SCREEN)}>
        <Text style={styles.cartText}>
          View cart 🛒({getTotalItems() ?? 0})
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const getInnerLeftButtonStyle = (disabled: boolean): ViewStyle => ({
  backgroundColor: disabled ? '#808080' : '#000',
  borderBottomLeftRadius: 16,
  borderTopLeftRadius: 16,
  paddingHorizontal: 12,
  paddingVertical: 6,
});

const getInnerRightButtonStyle = (disabled: boolean): ViewStyle => ({
  backgroundColor: disabled ? '#808080' : '#000',
  borderBottomRightRadius: 16,
  borderTopRightRadius: 16,
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
  backButton: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  capsuleControls: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 20,
    flexDirection: 'row',
    marginHorizontal: 12,
    marginVertical: 6,
  },
  cartButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 16,
    margin: 16,
    paddingVertical: 12,
  },
  cartText: {
    color: '#FEEF01',
    fontSize: 24,
  },
  container: {
    flex: 1,
    padding: 16,
  },
  description: {
    fontSize: 16,
    fontStyle: 'italic',
    marginTop: 12,
  },
  image: {
    height: 250,
    resizeMode: 'contain',
    width: '100%',
  },
  mainContainer: {
    backgroundColor: '#FEEF0190',
    flex: 1,
  },

  marginStyle: {
    marginTop: 4,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 12,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 4,
  },
  qty: {
    color: '#000',
    fontSize: 18,
    marginHorizontal: 12,
  },
  tagBadge: {
    backgroundColor: 'green',
    borderRadius: 12,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
