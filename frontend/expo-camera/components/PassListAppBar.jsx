import * as React from 'react';
import { Appbar, Searchbar } from 'react-native-paper';
import { Platform, StyleSheet, View } from 'react-native';
import { useState, useEffect } from 'react'; // Import useEffect
import { useNavigation } from '@react-navigation/native';
const MORE_ICON = Platform.OS === 'ios' ? 'dots-horizontal' : 'dots-vertical';
import { MyContext } from './FaceContext';
import { useContext } from 'react';

const PassListAppBar = () => {
  const { searchPassList , setSearchPassList } = useContext(MyContext);
  const navigation = useNavigation();

  const _goBack = () => {
     navigation.goBack() ;
  };

  const _handleSearch = () => {
    navigation.navigate('PassListFiltred');
  };



  useEffect(() => {
    console.log('Search value changed:', searchPassList);
  }, [searchPassList]); 

  return (
    <Appbar.Header style={styles.header}>
      <Appbar.BackAction onPress={_goBack} />
      <View style={styles.titleContainer}>
        <Appbar.Content title="PassListFaces" titleStyle={styles.title} />
        <Searchbar
          placeholder="Search"
          onChangeText={setSearchPassList}
          value={searchPassList}
          style={styles.searchBar}
          inputStyle={styles.searchInput}
          iconColor="#000" 
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

export default PassListAppBar;
