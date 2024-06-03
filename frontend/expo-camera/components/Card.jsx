import React, { useState, useEffect } from 'react';
import { Card, Text, Button, Portal, Modal } from 'react-native-paper';
import { View, StyleSheet, ScrollView } from 'react-native';
import { useContext } from 'react';
import { MyContext } from './FaceContext';

const imageMap = {
    'Sedki Bagga': require('../persons/Sedki Bagga.jpg'),
    'Amir Madhkour': require('../persons/Amir Madhkour.jpg'),
    'Rayen Ben Abdeljelil': require('../persons/Rayen Ben Abdeljelil.jpg'),
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; // Extracts YYYY-MM-DD from ISO string
};

const formatHour = (timestamp) => {
    const date = new Date(timestamp);
    const hour = date.getHours().toString().padStart(2, '0');
    const minute = date.getMinutes().toString().padStart(2, '0');
    return `${hour}:${minute}`;
};

const formatMinuteSeconds = (timestamp) => {
    const date = new Date(timestamp);
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${date.getMinutes()}:${seconds}`;
};

const Cards = ({ name, timestamp, onDelete , id}) => {
    const [PassModal, setPassModal] = useState(false);
    const [NotModal, setNotModal] = useState(false);
    const { passData, setPassData } = useContext(MyContext);
    const {rejectData , setRejectData} = useContext(MyContext) ; 
    const handleOkClick = () => {
        setPassModal(true);

    };

    const handleCancelClick = () => {
        setNotModal(true);
    };

    const handleDeleteNot = () => {
        const newData = {
            name,
            timestamp,
            id,
        }; 

        setRejectData ((prevData) => [...prevData , newData]) ; 

        
        setNotModal(false);
        onDelete(name);
    };

    const handleCloseModal = () => {
        setPassModal(false);
        setNotModal(false);
    };

    const putInPassData = () => {
        const newData = {
            name,
            timestamp,
            id,
        };

        // Append new data to existing passData array
        setPassData((prevData) => [...prevData, newData]);
        onDelete(name);

        handleCloseModal(); // Close the modal after adding data
    };

    useEffect(() => {
        // console.log("Updated passData:", passData);
    }, [passData]);

    const imageSource = imageMap[name];

    return (
        <ScrollView>
            <Card style={styles.card}>
                {imageSource && (
                    <Card.Cover source={imageSource} style={styles.cardCover} />
                )}

                <Card.Content style={styles.cardContent}>
                    <Text>{name}</Text>
                    {timestamp && (
                        <View>
                            <Text style={styles.timestampText}>Date: {formatDate(timestamp)}</Text>
                            <Text style={styles.timestampText}>Hour: {formatHour(timestamp)}</Text>
                            <Text style={styles.timestampText}>Minute & Seconds: {formatMinuteSeconds(timestamp)}</Text>
                        </View>
                    )}
                </Card.Content>

                <Card.Actions style={styles.cardActions}>
                    <Button mode="outlined" style={styles.actionButton} onPress={handleCancelClick}>
                        Not
                    </Button>

                    <Button mode="contained" style={styles.actionButton} onPress={handleOkClick}>
                        Pass
                    </Button>
                </Card.Actions>
            </Card>

            <Portal>
                <Modal visible={PassModal} onDismiss={handleCloseModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Are you sure? Can we pass it?</Text>
                        <View style={styles.buttonContainer}>
                            <Button mode="outlined" style={styles.modalButton} onPress={putInPassData}>
                                Yes
                            </Button>
                            <Button mode="outlined" style={styles.modalButton} onPress={handleCloseModal}>
                                No
                            </Button>
                        </View>
                    </View>
                </Modal>
                <Modal visible={NotModal} onDismiss={handleCloseModal} contentContainerStyle={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text>Are you sure?</Text>
                        <View style={styles.buttonContainer}>
                            <Button mode="outlined" style={styles.modalButton} onPress={handleDeleteNot}>
                                Yes
                            </Button>
                            <Button mode="outlined" style={styles.modalButton} onPress={handleCloseModal}>
                                No
                            </Button>
                        </View>
                    </View>
                </Modal>
            </Portal>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    card: {
        marginVertical: 10,
        marginHorizontal: 20,
    },
    cardContent: {
        paddingTop: 15,
    },
    cardActions: {
        justifyContent: 'flex-end',
        paddingRight: 10,
    },
    actionButton: {
        marginLeft: 10,
    },
    modalContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        flex: 1,
    },
    modalContent: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
        width: '80%',
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        marginTop: 20,
    },
    modalButton: {
        width: '40%',
    },
    cardCover: {
        width: '100%',
        height: 200,
    },
    timestampText: {
        marginTop: 8,
        color: 'gray',
        fontSize: 12,
    },
});

export default Cards;
