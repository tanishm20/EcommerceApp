import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export const TagBadge = ({ tag }: { tag: string }) => (
  <View style={styles.tagBadge}>
    <Text style={styles.tagText}>{tag}</Text>
  </View>
);

const styles = StyleSheet.create({
  tagBadge: {
    backgroundColor: 'green',
    borderRadius: 12,
    marginBottom: 8,
    marginRight: 8,
    paddingHorizontal: 10,
    paddingVertical: 4,
  },
  tagText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
});
