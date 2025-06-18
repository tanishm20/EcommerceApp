import React from 'react';
import { View, Text, Modal, Pressable, StyleSheet } from 'react-native';

interface IRemoveItemModalProps {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  confirmRemove: () => void;
}

export const RemoveItemModal = ({
  modalVisible,
  setModalVisible,
  confirmRemove,
}: IRemoveItemModalProps) => {
  return (
    <Modal transparent visible={modalVisible} animationType="fade">
      <View style={styles.modalBackdrop}>
        <View style={styles.modalContent}>
          <Text style={styles.modalText}>Do you want to remove this item?</Text>
          <View style={styles.modalButtons}>
            <Pressable onPress={confirmRemove} style={styles.modalConfirm}>
              <Text style={styles.modalButtonText}>Yes</Text>
            </Pressable>
            <Pressable
              onPress={() => setModalVisible(false)}
              style={styles.modalCancel}>
              <Text style={styles.modalButtonText}>Cancel</Text>
            </Pressable>
          </View>
        </View>
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
  modalButtonText: {
    color: '#FEEF01',
    fontWeight: 'bold',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalCancel: {
    alignItems: 'center',
    backgroundColor: '#808080',
    borderRadius: 8,
    flex: 1,
    marginLeft: 8,
    padding: 12,
  },
  modalConfirm: {
    alignItems: 'center',
    backgroundColor: '#000',
    borderRadius: 8,
    flex: 1,
    marginRight: 8,
    padding: 12,
  },
  modalContent: {
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 24,
    width: '80%',
  },
  modalText: {
    fontSize: 18,
    marginBottom: 16,
    textAlign: 'center',
  },
});
