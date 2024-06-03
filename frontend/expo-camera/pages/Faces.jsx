import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useQuery, useMutation } from 'react-query';
import Cards from '../components/Card';
import { fetchFaces, deleteFaceByName } from '../api/Recognition';
import CustomAppbar from '../components/Appbar';
import { Button } from 'react-native-paper';
import { AntDesign } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
const Faces = () => {
    const navigation = useNavigation();
    const { data, isLoading, error, refetch } = useQuery('recognizedFaces', fetchFaces);

    const mutation = useMutation(deleteFaceByName, {
        onSuccess: async () => {
            // After successful deletion, trigger a refetch to update the data
            await refetch();
        },
    });

    const handleDelete = async (name) => {
        try {
            await mutation.mutateAsync(name);
        } catch (error) {
            console.error('Error deleting recognized face:', error);
        }
    };

    const handleRefresh = async () => {
        await refetch();
    };

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
    const handlePassList = () => {
        navigation.navigate('PassList')
    } 
    const handleRejectList = () => {
        navigation.navigate('RejectList')
    }
    return (
        <ScrollView style={styles.backgroundScreen}>
            <CustomAppbar />
            {data.map((item) => (
                <Cards
                    key={item._id}
                    id = {item._id}
                    name={item.recognized_name}
                    timestamp={item.timestamp} // Pass timestamp to Cards component
                    onDelete={handleDelete}
                />
            ))}

            <View style={styles.buttonContainer}>
                <Button
                    icon={({ size, color }) => <AntDesign name="close" size={25} color={'red'} />}
                    mode="contained"
                    onPress= {handleRejectList}
                    style={styles.button}
                >
                    Reject List
                </Button>
                <Button
                    icon={({ size, color }) => <AntDesign name="check" size={25} color={'green'} />}
                    mode="contained"
                    onPress={handlePassList}
                    style={[styles.button, styles.buttonRight]}
                >
                    Pass List
                </Button>
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    backgroundScreen: {
        backgroundColor: '#F2F1F3',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: 16,
        marginTop: 20,
        marginBottom: '10%'
    },
    button: {
        flex: 1,
        marginHorizontal: 8,
        borderRadius: 45,
        elevation: 5, // Add shadow
    },
    buttonRight: {
        marginLeft: 'auto', // Push the button to the right
    },
});

export default Faces;
