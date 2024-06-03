import { View, Text } from 'react-native';
import React, { useContext } from 'react';
import RejectAppBar from '../components/RejectAppBar';
import { MyContext } from '../components/FaceContext';
import { ScrollView } from 'react-native';
import RejectCard from '../components/RejectCard';
const RejectListFiltred = () => {
    const { rejectData, searchRejectList } = useContext(MyContext);
    console.log(rejectData);
    console.log(searchRejectList);

    return (
        <ScrollView>
            <RejectAppBar />
            {rejectData.map((item, index) => {
                if (item.name === searchRejectList) {
                    return (
                        <RejectCard
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

export default RejectListFiltred;
