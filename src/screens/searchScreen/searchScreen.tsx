import React from 'react';
import { View, Text, FlatList, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';
import { selectFilteredData } from '@screens/homeScreen/redux/home.api.selector';
import { BackComponent } from '@common/backComponent/backComponent';
import { IProductDataType } from '@screens/homeScreen/redux/home.initialState';
import { ProductCard } from '@common/productCard/productCard';

export const SearchScreen = () => {
  const filteredData = useSelector(selectFilteredData);
  const renderItem = ({ item }: { item: IProductDataType }) => (
    <ProductCard item={item} variant="wide" />
  );

  return (
    <View style={styles.mainContainer}>
      <BackComponent />
      <Text style={styles.sectionTitle}>Searched Product</Text>
      <FlatList
        data={filteredData}
        keyExtractor={item => item.id}
        renderItem={renderItem}
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled
        contentContainerStyle={styles.carouselContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  mainContainer: {
    backgroundColor: '#FEEF0185',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});
