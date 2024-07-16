import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useAuth } from '../AuthContext';
import { useRouter } from 'expo-router';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

const router = useRouter()
    const { checkAuthStatus } = useAuth();

    const handleLogin = async () => {
        try {
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email, 
                    password,
                }),
            });

            const loginResponse = await response.json();
            console.log('Login response:', loginResponse);

            if (response.ok) {
                await AsyncStorage.setItem('access_token', loginResponse.access_token);
                await AsyncStorage.setItem('refresh_token', loginResponse.refresh_token);
                await AsyncStorage.setItem('user_code', loginResponse.user.user_code);

                await checkAuthStatus();

                Alert.alert('Login Successful', 'You have successfully logged in.');
                router.push('index');
            } else {
                Alert.alert('Login Failed', loginResponse.message || 'Please try again.');
            }
        } catch (error) {
            console.error('Error during login:', error);
            Alert.alert('Error', 'An error occurred. Please try again.');
        }
    };

    return (
        <View style={styles.container}>
            <Video
                source={require('../../assets/videos/bg1.mp4')}
                style={StyleSheet.absoluteFill}
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
                isMuted
            />
            <View style={styles.overlay}>
                <Text style={styles.welcome}>Welcome Back To Jabadoor!</Text>
                <TextInput
                    placeholder="Enter Email"
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                />
                <TextInput
                    placeholder="Enter Password"
                    style={styles.input}
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />
                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>LOG IN</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={() => router.push('register')}>
                    <Text style={styles.signUpText}>Don't have an account? Sign up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 25,
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Adding a semi-transparent overlay for better text visibility
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff', // Background color for inputs to make text readable
    },
    loginButton: {
        width: '100%',
        padding: 15,
        backgroundColor: '#ff0066',
        borderRadius: 5,
        alignItems: 'center',
        marginBottom: 10,
    },
    welcome: {
        color: '#fff',
        fontWeight: 'bold',
    },
    loginButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    signUpText: {
        marginTop: 20,
        color: '#fff',
        textDecorationLine: 'underline',
    },
});

export default Login;
