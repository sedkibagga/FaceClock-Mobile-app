import React, { useContext } from 'react';
import { View, Text, ScrollView } from 'react-native';
import PassListAppBar from '../components/PassListAppBar';
import PassRejectCard from '../components/PassRejectCard';
import { MyContext } from '../components/FaceContext';

const PassListFiltred = () => {
  const { passData, searchPassList } = useContext(MyContext);

  console.log(passData);
  console.log(searchPassList);

  return (
    <ScrollView>
      <PassListAppBar />
      {passData.map((item, index) => {
        if (item.name === searchPassList) {
          return (
            <PassRejectCard
              key={index}
              id={item.id}
              name={item.name}
              timestamp={item.timestamp}
            />
          );
        } else {
          return null; 
        }
      })}
    </ScrollView>
  );
};

export default PassListFiltred;
