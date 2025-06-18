import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TextInput,
  Pressable,
  KeyboardAvoidingView,
  Platform,
  TextInputSubmitEditingEventData,
} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';
import productList from '@mockData/ProductList.json';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import {
  PRODUCT_DETAILS_SCREEN,
  SEARCH_SCREEN,
} from 'src/utils/routesConstants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useDispatch } from 'react-redux';
import { setFilteredData } from './redux/home.api.slice';

const { width } = Dimensions.get('window');

export const HomeScreen = () => {
  const [query, setQuery] = useState<string>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const handleSearch = (text: string) => () => {
    if (text.trim()) {
      const filtered = productList.products.filter(product =>
        product.name.toLowerCase().includes(text.toLowerCase()),
      );
      if (filtered?.length > 0) {
        setQuery(undefined);
        dispatch(setFilteredData({ data: filtered }));
        navigation.navigate(SEARCH_SCREEN);
      } else {
        setQuery(undefined);
        dispatch(setFilteredData({ data: undefined }));
      }
    }
  };

  const onSubmitEditing = ({
    nativeEvent,
  }: {
    nativeEvent: TextInputSubmitEditingEventData;
  }) => {
    handleSearch(nativeEvent.text)();
  };

  return (
    <KeyboardAvoidingView
      style={styles.mainContainer}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search products..."
          value={query}
          onChangeText={setQuery}
          onSubmitEditing={onSubmitEditing}
        />

        <Pressable
          style={styles.searchButton}
          onPress={handleSearch(query ?? '')}>
          <Text style={styles.searchText}>Search</Text>
        </Pressable>
      </View>
      <Carousel
        loop
        width={width}
        height={200}
        autoPlay
        data={productList.banners}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <Image
            source={{ uri: item.image }}
            style={styles.bannerImage}
            resizeMode="stretch"
          />
        )}
      />

      <Text style={styles.sectionTitle}>Featured Products</Text>
      <FlatList
        keyboardShouldPersistTaps="handled"
        numColumns={2}
        showsVerticalScrollIndicator={false}
        data={productList.products}
        keyExtractor={item => item.id}
        nestedScrollEnabled
        contentContainerStyle={styles.carouselContainer}
        renderItem={({ item }) => (
          <Pressable
            style={styles.productCard}
            onPress={() => {
              navigation.navigate(PRODUCT_DETAILS_SCREEN, { product: item });
            }}>
            <Image
              source={{ uri: item.image }}
              style={styles.productImage}
              resizeMode="cover"
            />
            <Text style={styles.productName}>{item.name}</Text>
            <Text style={styles.productPrice}>₹{item.price}</Text>
            {item?.tags &&
              item?.tags?.map((tag, idx) => (
                <Text key={idx} style={styles.productTag}>
                  {tag}
                </Text>
              ))}
          </Pressable>
        )}
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
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 10,
    marginRight: 12,
    padding: 10,
    width: width * 0.45,
  },
  productImage: {
    alignSelf: 'center',
    height: 100,
    marginBottom: 8,
    resizeMode: 'contain',
    width: '100%',
  },
  productName: { fontSize: 14, fontWeight: '500' },
  productPrice: { fontSize: 14, fontWeight: 'bold', marginVertical: 4 },
  productTag: {
    backgroundColor: '#e0f7e9',
    borderRadius: 4,
    color: 'green',
    fontSize: 11,
    marginTop: 2,
    paddingHorizontal: 6,
  },
  searchButton: {
    backgroundColor: 'black',
    borderRadius: 16,
    flex: 0.15,
    justifyContent: 'center',
    marginVertical: 12,
    overflow: 'hidden',
    paddingHorizontal: 8,
    paddingVertical: 12,
  },
  searchContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  searchInput: {
    backgroundColor: '#fff',
    borderRadius: 8,
    flex: 0.85,
    fontSize: 16,
    marginHorizontal: 16,
    marginVertical: 12,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  searchText: {
    color: '#FEEF01',
    fontSize: 14,
    fontWeight: '800',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});
