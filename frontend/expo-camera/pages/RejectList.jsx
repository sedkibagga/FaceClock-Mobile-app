import { View, Text } from 'react-native';
import React from 'react';
import RejectAppBar from '../components/RejectAppBar';
import { MyContext } from '../components/FaceContext';
import { useContext } from 'react';
import { ScrollView } from 'react-native';
import PassRejectCard from '../components/PassRejectCard';
import RejectCard from '../components/RejectCard';
const RejectList = () => { 
  const { rejectData } = useContext(MyContext);
  console.log(rejectData);

  return ( 
    <ScrollView>
      <RejectAppBar/>
      {rejectData.map((item , index) => (
         <RejectCard
           key={index} 
           id={item.id}
           name={item.name}
           timestamp={item.timestamp}
         />
      ))}
    </ScrollView>
  );
}

export default RejectList;
