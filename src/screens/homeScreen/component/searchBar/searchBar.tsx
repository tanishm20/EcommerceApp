import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Pressable,
  TextInputSubmitEditingEventData,
} from 'react-native';

export const SearchBar = ({
  query,
  setQuery,
  onSearch,
}: {
  query: string | undefined;
  setQuery: (text: string) => void;
  onSearch: (text: string) => void;
}) => {
  const onSubmitEditing = ({
    nativeEvent,
  }: {
    nativeEvent: TextInputSubmitEditingEventData;
  }) => {
    onSearch(nativeEvent.text);
  };

  return (
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
        onPress={() => onSearch(query ?? '')}>
        <Text style={styles.searchText}>Search</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
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
});
