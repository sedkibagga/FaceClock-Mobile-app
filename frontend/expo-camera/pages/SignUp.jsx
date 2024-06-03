import React, { useState } from 'react';
import { View, KeyboardAvoidingView, ScrollView, StyleSheet, Image, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'; // Import Axios

const SignUp = () => {
    const navigation = useNavigation();
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [eye, setEye] = useState(true);

    
    // Regular expression for email validation
    const validateEmail = (email) => {
        // Regex for basic email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const handleSignUp = async () => {
        // Validate input fields
        if (username.length === 0 || email.length === 0 || password.length === 0 || confirmPassword.length === 0) {
            setError('There is an empty input');
            return;
        }

        // Perform email format validation
        if (!validateEmail(email)) {
            setError('Invalid email format');
            return;
        }

        // Perform password match validation
        if (password !== confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        try {
            const user = { username, email, password };
            console.log('Creating user:', user);


            // Make a POST request using Axios
            const response = await axios.post('your server', user);

            // Reset form fields and navigate to SignIn screen on successful user creation
            setEmail('');
            setUsername('');
            setPassword('');
            setConfirmPassword('');
            console.log('User created successfully:', response.data);
            navigation.navigate('SignIn');
            setError('') ; 
        } catch (error) {

            // console.error('Error creating user:', error);
            setError('account exist') ; 
        }
    };

    const toggleEye = () => {
        setEye(prevState => !prevState);
    };
    const handleNavigate = () => {
         navigation.navigate('SignIn') ;
         setError('') ;
    }

    return (
        <KeyboardAvoidingView style={{ flex: 1, backgroundColor: '#f5f5f5' }} behavior="padding">
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
                <View style={styles.container}>
                    <View style={styles.blueView}>
                        <Image
                            source={{ uri: 'https://miro.medium.com/v2/resize:fit:624/1*52VqXh3rMFSs22kG-hPBwA.png' }}
                            style={{ width: '95%', height: '95%', resizeMode: 'cover' }}
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
                            label="Email"
                            value={email}
                            onChangeText={setEmail}
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Password"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry={eye}
                            right={<TextInput.Icon icon={eye ? "eye" : "eye-off"} onPress={toggleEye} />}
                            style={styles.textInput}
                        />
                        <TextInput
                            label="Confirm Password"
                            value={confirmPassword}
                            onChangeText={setConfirmPassword}
                            secureTextEntry={eye}
                            right={<TextInput.Icon icon={eye ? "eye" : "eye-off"} onPress={toggleEye} />}
                            style={styles.textInput}
                        />
                        <Button mode="contained" onPress={handleSignUp} style={styles.button}>Sign Up</Button>
                        <Text onPress={handleNavigate} style={styles.haveAccount}>
                            Already have an account? Sign In
                        </Text>
                        <Text style={styles.error}>{error}</Text>
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
        marginTop: 30,
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
    haveAccount: {
        
        color: 'blue',
        textAlign: 'center',
        textDecorationLine: 'underline',
    },
});

export default SignUp;
