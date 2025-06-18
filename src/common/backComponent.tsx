import React, { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { ParamListBase, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export const BackComponent = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity onPress={() => navigation.goBack()}>
      <Text style={styles.backButton}>{'← Back'}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  backButton: {
    fontSize: 18,
    fontWeight: '600',
  },
});
