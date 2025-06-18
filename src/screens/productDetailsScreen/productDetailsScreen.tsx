import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { BackComponent } from '@common/backComponent/backComponent';
import { TagBadge } from './component/tagBadge/tagBadge';
import { CartControls } from './component/cartControls/cartControls';
import { useProductDetailsScreen } from './useProductDetailsScreen';

export const ProductDetailsScreen = () => {
  const {
    onViewCartPress,
    onAddToCart,
    onRemoveFromCart,
    getTotalItems,
    quantity,
    product,
  } = useProductDetailsScreen();
  return (
    <View style={styles.mainContainer}>
      <BackComponent />
      <View style={styles.container}>
        <Image source={{ uri: product?.image }} style={styles.image} />
        <Text style={styles.name}>{product?.name}</Text>
        <Text style={styles.price}>₹{product?.price}</Text>
        {product?.tags && product?.tags?.length > 0 && (
          <View style={styles.tagContainer}>
            {product?.tags.map(tag => (
              <TagBadge key={tag} tag={tag} />
            ))}
          </View>
        )}
        <Text style={[styles.addToCartLabel, styles.marginStyle]}>
          Description
        </Text>
        <Text style={styles.description}>
          {product?.description || 'No description available.'}
        </Text>
        <CartControls
          quantity={quantity}
          onAdd={onAddToCart(product)}
          onRemove={onRemoveFromCart(product)}
        />
      </View>
      <TouchableOpacity style={styles.cartButton} onPress={onViewCartPress}>
        <Text style={styles.cartText}>View cart ({getTotalItems() ?? 0})</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  addToCartLabel: {
    color: '#000',
    fontSize: 18,
    fontWeight: '600',
  },
  cartButton: {
    alignItems: 'center',
    backgroundColor: 'black',
    borderRadius: 16,
    paddingVertical: 12,
  },
  cartText: {
    color: '#FEEF01',
    fontSize: 24,
  },
  container: {
    flex: 1,
    paddingVertical: 16,
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
    paddingHorizontal: 16,
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
  tagContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 8,
  },
});
