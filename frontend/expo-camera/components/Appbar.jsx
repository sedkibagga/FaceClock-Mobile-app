import * as React from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import { Platform, StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react'; // Import useEffect
import { useNavigation } from '@react-navigation/native';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import { MyContext } from './FaceContext';
import { useContext } from 'react';

const CustomAppbar = () => {
  const { search, setSearch } = useContext(MyContext);
  const navigation = useNavigation();

  const _goBack = () => {
     navigation.goBack() ;
  };

  const _handleSearch = () => {
    navigation.navigate('PersonsFiltred');
  };

  const _handleMore = () => {
    // Implement your more functionality here
  };

  // useEffect to monitor changes to the search value
  useEffect(() => {
    // Perform any side effect or action when search value changes
    console.log('Search value changed:', search);
  }, [search]); // Include search in the dependency array

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={_goBack} />
      <View style={styles.titleContainer}>
        <Appbar.Content title="Faces" titleStyle={styles.title} />
        <Searchbar
          placeholder="Search"
          onChangeText={setSearch}
          value={search}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#000" // Customize search icon color
          onIconPress={_handleSearch}
        />
      </View>
    </Appbar.Header>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: '#fff',
    elevation: 0,
    shadowOpacity: 0,
  },
  titleContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 16,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  searchBar: {
    flex: 1,
    marginLeft: '1%',
    marginRight: 16, // Add margin from the right
    backgroundColor: 'transparent',
    borderBottomWidth: 0,
  },
  searchInput: {
    fontSize: 16,
    color: '#000',
  },
});

export default CustomAppbar;
