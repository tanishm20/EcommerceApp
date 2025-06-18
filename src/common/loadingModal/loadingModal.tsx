import React from 'react';
import { View, Text, Modal, ActivityIndicator, StyleSheet } from 'react-native';

interface LoadingModalProps {
  visible: boolean;
}

export const LoadingModal = ({ visible }: LoadingModalProps) => {
  return (
    <Modal transparent visible={visible} animationType="fade">
      <View style={styles.modalBackdrop}>
        <ActivityIndicator size="large" color="#FEEF01" />
        <Text style={styles.modalText}>{'Please wait....'}</Text>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackdrop: {
    alignItems: 'center',
    backgroundColor: '#00000099',
    flex: 1,
    justifyContent: 'center',
  },
  modalText: {
    color: '#FEEF01',
    fontSize: 16,
    marginTop: 16,
  },
});
