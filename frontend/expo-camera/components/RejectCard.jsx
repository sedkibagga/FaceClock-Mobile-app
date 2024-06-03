import React, { useContext } from 'react';
import { Card, Text, Button } from 'react-native-paper';
import { View, StyleSheet } from 'react-native';
import { MyContext } from './FaceContext';

const imageMap = {
    'Sedki Bagga': require('../persons/Sedki Bagga.jpg'),
    'Amir Madhkour': require('../persons/Amir Madhkour.jpg'),
    'Rayen Ben Abdeljelil': require('../persons/Rayen Ben Abdeljelil.jpg'),
};

const formatDate = (timestamp) => {
    const date = new Date(timestamp);
    return date.toISOString().split('T')[0]; 
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

   
const RejectCard = ({ name, timestamp, id }) => {
    const imageSource = imageMap[name];
    const {rejectData , setRejectData} = useContext(MyContext) ; 

    const onDelete = () => {
        const updatedPassData = rejectData.filter((item) => item.id !== id);
        setRejectData(updatedPassData); 

    };

  return (
    <Card style={styles.card}>
            {imageSource && <Card.Cover source={imageSource} style={styles.cardCover} />}

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
                <Button mode="outlined" style={styles.actionButton} onPress={() => onDelete(id)}>
                    Delete
                </Button>
            </Card.Actions>
        </Card>
  )
} 

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

export default RejectCard