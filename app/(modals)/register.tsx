import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Video, ResizeMode } from 'expo-av';
import { RadioButton } from 'react-native-paper';

import { router } from 'expo-router';


const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');

    const handleSignUp = async () => {
        const result = await fetch("http://192.168.1.9:3000/auth/signup", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({name, email, password,role }),
          });
        
          const respo = await result.json();
      
          if (respo?.access_token) {
            router.replace('/login');
            return;
          }

          {
            Alert.alert(
              "Signup Failed",
              "Please check your credentials and try again."
            );
           
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
                <Text style={styles.welcome}>Welcome To AirBnb Clone!</Text>


<View style={styles.role}>
<View>
    <Text style={styles.roleText}>User</Text>
<RadioButton
        value="user"
        status={ role === 'user' ? 'checked' : 'unchecked' }
        onPress={() => setRole('user')}
      />
</View>

<View style={styles.roleRadio}>
<Text style={styles.roleText}>Business</Text>

      <RadioButton
        value="business"
        status={ role === 'business' ? 'checked' : 'unchecked' }
        onPress={() => setRole('business')}
        />
        </View>
    </View>
                <TextInput
                    placeholder="Enter Name"
                    style={styles.input}
                    value={name}
                    onChangeText={setName}
                />
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
                <TouchableOpacity style={styles.signUpButton} onPress={handleSignUp}>
                    <Text style={styles.signUpButtonText}>SIGN UP</Text>
                </TouchableOpacity>


                <TouchableOpacity onPress={() => router.navigate('/login')}>
                    <Text style={styles.signInText}>Already have an account? Sign in</Text>
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
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    input: {
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff',
    },
    roleRadio:{
        
    },
    role:{
        flexDirection: 'row',
        justifyContent: 'center',
        width: '100%',
        gap:20,
        marginVertical: 10,
    },
    roleLabel:{
        color: '#fff',
        fontWeight: 'bold',
        marginBottom: 10,
    },
    roleText:{
        fontSize: 16,
        marginBottom: 5,
        color: '#fff',
    },
    signUpButton: {
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
    signUpButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
    orText: {
        marginVertical: 10,
        fontWeight: 'bold',
        color: '#fff', // Text color for better visibility
    },
    continueButton: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        marginBottom: 10,
        backgroundColor: '#fff', // Background color for buttons to make text readable
    },
    continueButtonText: {
        marginLeft: 10,
    },
    socialContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginVertical: 10,
    },
    socialButton: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: 15,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        flex: 1,
        marginHorizontal: 5,
        backgroundColor: '#fff', // Background color for buttons to make text readable
    },
    socialButtonText: {
        marginLeft: 10,
    },
    signInText: {
        marginTop: 20,
        color: '#fff',
        textDecorationLine: 'underline',
    },
});

export default Register;
