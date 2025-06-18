import React from 'react';
import { Text, StyleSheet, Image, Dimensions, Pressable } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ParamListBase } from '@react-navigation/native';
import { PRODUCT_DETAILS_SCREEN } from '@utils/routesConstants';
import { IProductDataType } from '@screens/homeScreen/redux/home.initialState';

const { width } = Dimensions.get('window');

interface IProductCardProps {
  item: IProductDataType;
  variant?: 'wide' | 'compact';
}

export const ProductCard = ({
  item,
  variant = 'compact',
}: IProductCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const onPress = () => {
    navigation.navigate(PRODUCT_DETAILS_SCREEN, { product: item });
  };

  const isWide = variant === 'wide';

  return (
    <Pressable
      style={[
        styles.productCard,
        isWide ? styles.wideImageWidth : styles.narrowImageWidth,
      ]}
      onPress={onPress}>
      <Image
        source={{ uri: item.image }}
        style={[
          styles.productImage,
          isWide ? styles.wideImageHeight : styles.narrowImageHeight,
        ]}
        resizeMode="contain"
      />
      <Text style={styles.productName}>{item.name}</Text>
      <Text style={styles.productPrice}>₹{item.price}</Text>
      {item.tags?.map((tag: string, idx: number) => (
        <Text key={idx} style={styles.productTag}>
          {tag}
        </Text>
      ))}
    </Pressable>
  );
};

const styles = StyleSheet.create({
  narrowImageHeight: {
    height: 100,
  },
  narrowImageWidth: {
    width: width * 0.45,
  },
  productCard: {
    backgroundColor: '#fff',
    borderRadius: 8,
    elevation: 3,
    marginBottom: 10,
    marginRight: 12,
    padding: 10,
  },
  productImage: {
    alignSelf: 'center',
    marginBottom: 8,
    width: '100%',
  },
  productName: {
    fontSize: 14,
    fontWeight: '500',
  },
  productPrice: {
    fontSize: 14,
    fontWeight: 'bold',
    marginVertical: 4,
  },
  productTag: {
    backgroundColor: '#e0f7e9',
    borderRadius: 4,
    color: 'green',
    fontSize: 11,
    marginTop: 2,
    paddingHorizontal: 6,
  },

  wideImageHeight: {
    height: 150,
  },
  wideImageWidth: {
    width: width * 0.9,
  },
});
