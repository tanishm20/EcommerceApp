import React from 'react';
import {
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import productList from '@mockData/ProductList.json';
import { SearchBar } from '@screens/homeScreen/component/searchBar/searchBar';
import { ProductCard } from '@common/productCard/productCard';
import { IProductDataType } from './redux/home.initialState';
import { useHomeScreen } from './useHomeScreen';

const { width } = Dimensions.get('window');

interface IBannerData {
  id: string;
  image: string;
}
export const HomeScreen = () => {
  const { query, setQuery, handleSearch } = useHomeScreen();

  const renderImageItem = ({ item }: { item: IBannerData }) => (
    <Image
      source={{ uri: item.image }}
      style={styles.bannerImage}
      resizeMode="stretch"
    />
  );

  const renderProductItem = ({ item }: { item: IProductDataType }) => (
    <ProductCard item={item} variant="compact" />
  );

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <SearchBar query={query} setQuery={setQuery} onSearch={handleSearch} />
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay
        data={productList.banners}
        scrollAnimationDuration={1000}
        renderItem={renderImageItem}
      />
      <Text style={styles.sectionTitle}>Featured Products</Text>
      <FlatList
        keyboardShouldPersistTaps="handled"
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={productList.products as IProductDataType[]}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        contentContainerStyle={styles.carouselContainer}
        renderItem={renderProductItem}
      />
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  bannerImage: {
    height: '100%',
    width: '100%',
  },
  carouselContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  mainContainer: {
    backgroundColor: '#FEEF0190',
    flex: 1,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});
