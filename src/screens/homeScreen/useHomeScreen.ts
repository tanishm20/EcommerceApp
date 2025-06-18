import { useState } from 'react';
import { useDispatch } from 'react-redux';
import productList from '@mockData/ProductList.json';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { SEARCH_SCREEN } from '@utils/routesConstants';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { setFilteredData } from './redux/home.api.slice';

export const useHomeScreen = () => {
  const [query, setQuery] = useState<string>();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const dispatch = useDispatch();

  const handleSearch = (searchText: string) => {
    const trimmed = searchText.trim();
    if (!trimmed) return;

    const filtered = productList.products.filter(product =>
      product.name.toLowerCase().includes(trimmed.toLowerCase()),
    );

    setQuery(undefined);
    dispatch(setFilteredData({ data: filtered.length ? filtered : undefined }));

    if (filtered.length > 0) {
      navigation.navigate(SEARCH_SCREEN);
    }
  };

  return {
    query,
    setQuery,
    handleSearch,
  };
};
