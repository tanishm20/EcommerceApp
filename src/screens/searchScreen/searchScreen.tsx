import React from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  Pressable,
} from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useSelector } from 'react-redux';
import { selectFilteredData } from '../homeScreen/redux/home.api.selector';
import { PRODUCT_DETAILS_SCREEN } from 'src/utils/routesConstants';

const { width } = Dimensions.get('window');

export const SearchScreen = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const filteredData = useSelector(selectFilteredData);

  const onBackClick = () => {
    navigation.goBack();
  };
  return (
    <View style={styles.mainContainer}>
      <TouchableOpacity activeOpacity={1} onPress={onBackClick}>
        <Text style={styles.backButton}>{'← Back'}</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>{'Searched Product'}</Text>
      <FlatList
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        data={filteredData}
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
    </View>
  );
};

const styles = StyleSheet.create({
  backButton: {
    fontSize: 18,
    fontWeight: '600',
    paddingHorizontal: 16,
  },
  carouselContainer: {
    marginTop: 10,
    paddingHorizontal: 16,
  },
  mainContainer: {
    backgroundColor: '#FEEF0185',
    flex: 1,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 10,
    marginRight: 12,
    padding: 10,
    width: width * 0.9,
  },
  productImage: {
    alignSelf: 'center',
    height: 150,
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginVertical: 20,
    paddingHorizontal: 16,
  },
});
