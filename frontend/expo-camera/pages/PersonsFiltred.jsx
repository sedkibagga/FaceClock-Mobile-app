import React, { useContext, useEffect, useState } from 'react';
import { View, ActivityIndicator, Text, ScrollView } from 'react-native';
import CustomAppbar from '../components/Appbar';
import { MyContext } from '../components/FaceContext';
import { useQuery } from 'react-query';
import { fetchFacesByName } from '../api/Recognition';
import Cards from '../components/Card';

const PersonsFiltred = () => {
  const { search } = useContext(MyContext);
  const [searchTerm, setSearchTerm] = useState(search);
  const { data, isError, isLoading, refetch } = useQuery('Face', () => fetchFacesByName(searchTerm));
  console.log(data) ;
  // Update searchTerm when the context search changes
  useEffect(() => {
    setSearchTerm(search);
  }, [search]);

  // Refetch data when searchTerm changes
  useEffect(() => {
    refetch();
  }, [searchTerm, refetch]);

  if (isError) {
    console.error('Error fetching data:', isError.message);
    return <Text>Error fetching data</Text>;
  }

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="blue" />
      </View>
    );
  }

  // Handle no results or empty data
  if (!data || (Array.isArray(data) && data.length === 0)) {
    return (
      <ScrollView>
        <CustomAppbar />
        <Text>No results found for "{searchTerm}"</Text>
      </ScrollView>
    );
  }

  // Render the fetched data
  return (
    <ScrollView>
      <CustomAppbar />
      {Array.isArray(data) ? (
        data.map((item) => (
          <Cards key={item._id} name={item.recognized_name} onDelete={() => {}} timestamp={item.timestamp} />
        ))
      ) : (
        <Cards key={data._id} name={data.recognized_name} onDelete={() => {}} timestamp={data.timestamp} />
      )}
    </ScrollView>
  );
};

export default PersonsFiltred;
