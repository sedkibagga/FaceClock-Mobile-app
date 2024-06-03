import React, { useState } from 'react';
import { withExpoSnack } from 'nativewind';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Image } from 'react-native';
import { TextInput, Button, useTheme, ActivityIndicator, Text } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { fetchUsers } from '../api/User_api';
import { useQuery } from 'react-query';
import { useContext } from 'react';
import { MyContext } from '../components/FaceContext';
const SignIn = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [eye, setEye] = useState(true);
    const [error, setError] = useState('');
    const {showDrawer , setShowDrawer} = useContext(MyContext) ; 
    const { colors } = useTheme();
  
    const { data, isLoading, isError } = useQuery('User', fetchUsers);

    const handleSignIn = () => {
        if (username.length === 0 || password.length === 0) {
            setError('Please fill in both username and password');
            return;
        }

        if (isError) {
            setError('Error fetching data');
            return;
        }

        if (isLoading) {
            return <ActivityIndicator />;
        }

        const foundUser = data.find((item) => item.username === username && item.password === password);

        if (foundUser) {
           
            setShowDrawer(true) 
            
            navigation.navigate('Faces');
            setError('') ;
        } else {
            setError('Invalid credentials');
        }
    };

    const toggleEye = () => {
        setEye((prevState) => !prevState);
    };

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#f5f5f5' }} behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.blueView}>
                        <Image
                            source={{ uri: 'https://miro.medium.com/v2/resize:fit:624/1*52VqXh3rMFSs22kG-hPBwA.png' }}
                            style={{ width: '100%', height: '100%', resizeMode: 'cover' }}
                        />
                    </View>
                    <View style={styles.formContainer}>
                        <TextInput
                            label="Username"
                            value={username}
                            onChangeText={setUsername}
                            style={styles.textInput}
                        />

                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={eye}
                            right={<TextInput.Icon icon={eye ? 'eye' : 'eye-off'} onPress={toggleEye} />}
                            style={styles.textInput}
                        />

                        <Button mode="contained" onPress={handleSignIn} style={styles.button}>
                            Sign In
                        </Button>

                        {error ? <Text style={styles.error}>{error}</Text> : null}
                    </View>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    blueView: {
        aspectRatio: 1,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        width: '90%',
        maxWidth: 400,
    },
    formContainer: {
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        margin: 8,
        padding: 16,
        width: '90%',
        maxWidth: 400,
        borderRadius: 12,
        elevation: 4,
    },
    textInput: {
        width: '100%',
        marginBottom: 12,
        backgroundColor: 'white',
    },
    button: {
        marginTop: 16,
        width: '100%',
    },
    error: {
        color: 'red',
        marginTop: 8,
    },
});

export default withExpoSnack(SignIn);
