import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import CustomAppbar from '../components/Appbar';
import PassRejectCard from '../components/PassRejectCard';
import { MyContext } from '../components/FaceContext';
import PassListAppBar from '../components/PassListAppBar';
const PassList = () => {
  const { passData } = useContext(MyContext);

  return (
    <ScrollView>
      <PassListAppBar />
      {passData.map((item, index) => (
        <PassRejectCard
          key={index} 
          id={item.id}
          name={item.name}
          timestamp={item.timestamp}
        />
      ))} 
    </ScrollView>
  );
};

export default PassList;
