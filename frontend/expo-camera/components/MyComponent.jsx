import React from 'react';
import { View, Text } from 'react-native';
import { useQuery } from 'react-query';
import Card from './Card';
import { fetchFaces } from '../api/Recognition';

const MyComponent = () => {
    const { data, isLoading, error } = useQuery('recognizedFaces', fetchFaces);

    if (isLoading) {
        return (
            <View>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View>
                <Text>Error fetching data: {error.message}</Text>
            </View>
        );
    }

    return (
        <View>
            {data.map((item) => (
                <Card key={item._id} name={item.recognized_name} />
            ))}
        </View>
    );
};

export default MyComponent;
