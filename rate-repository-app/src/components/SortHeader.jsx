import React, { useState } from 'react';
import { View, StyleSheet, Pressable, Text, Platform, Modal, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import theme from '../theme';

const orderByOptions = [
  {
    label: "Latest repositories",
    value: "CREATED_AT_DESC",
    orderBy: "CREATED_AT",
    orderDirection: "DESC"
  },
  {
    label: "Highest rated repositories",
    value: "RATING_AVERAGE_DESC",
    orderBy: "RATING_AVERAGE",
    orderDirection: "DESC"
  },
  {
    label: "Lowest rated repositories",
    value: "RATING_AVERAGE_ASC",
    orderBy: "RATING_AVERAGE",
    orderDirection: "ASC"
  }
];

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  button: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 4,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  buttonText: {
    fontSize: 16,
    color: theme.colors.textPrimary
  },
  // iOS Modal 样式
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingBottom: 20,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ecf0f1',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: theme.colors.textPrimary,
  },
  modalButton: {
    fontSize: 16,
    color: theme.colors.primary || '#3498db',
  },
  pickerContainer: {
    paddingHorizontal: 20,
  },
  picker: {
    height: 200,
  },
});

const SortHeader = ({ selectedSort, setSelectedSort }) => {
  const [showPicker, setShowPicker] = useState(false);
  const [tempSelection, setTempSelection] = useState(selectedSort);
  const selectedOption = orderByOptions.find(option => option.value === selectedSort);

  const handleConfirm = () => {
    setSelectedSort(tempSelection);
    setShowPicker(false);
  };

  const handleCancel = () => {
    setTempSelection(selectedSort);
    setShowPicker(false);
  };

  const handleShowPicker = () => {
    setTempSelection(selectedSort);
    setShowPicker(true);
  };

  if (Platform.OS === 'android') {
    return (
      <View style={styles.container}>
        <Picker
          selectedValue={selectedSort}
          onValueChange={(itemValue) => setSelectedSort(itemValue)}
        >
          {orderByOptions.map((option) => (
            <Picker.Item 
              key={option.value}
              label={option.label}
              value={option.value}
            />
          ))}
        </Picker>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Pressable 
        style={styles.button}
        onPress={handleShowPicker}
      >
        <Text style={styles.buttonText}>
          {selectedOption?.label || 'Latest repositories'}
        </Text>
        <Text>▼</Text>
      </Pressable>

      <Modal
        visible={showPicker}
        transparent={true}
        animationType="slide"
        onRequestClose={handleCancel}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <TouchableOpacity onPress={handleCancel}>
                <Text style={styles.modalButton}>Cancel</Text>
              </TouchableOpacity>
              <Text style={styles.modalTitle}>Sort by</Text>
              <TouchableOpacity onPress={handleConfirm}>
                <Text style={styles.modalButton}>Confirm</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.pickerContainer}>
              <Picker
                selectedValue={tempSelection}
                onValueChange={(itemValue) => setTempSelection(itemValue)}
                style={styles.picker}
              >
                {orderByOptions.map((option) => (
                  <Picker.Item 
                    key={option.value}
                    label={option.label}
                    value={option.value}
                  />
                ))}
              </Picker>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export { orderByOptions };
export default SortHeader;