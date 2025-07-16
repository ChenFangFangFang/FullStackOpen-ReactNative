import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Searchbar } from 'react-native-paper';

const styles = StyleSheet.create({
  searchContainer: {
    padding: 15,
    backgroundColor: 'white',
  },
});

const SearchRepository = ({ searchQuery, setSearchQuery }) => {
  return (
    <View style={styles.searchContainer}>
      <Searchbar
        placeholder="Search repositories..."
        onChangeText={setSearchQuery}
        value={searchQuery}
      />
    </View>
  );
};

export default SearchRepository;