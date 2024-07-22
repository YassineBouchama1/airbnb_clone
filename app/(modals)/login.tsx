import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthContext";
import { useRouter } from "expo-router";

import Loader from "../shared/loader";
const API_URL = "http://192.168.1.5:3000"; // Your server IP

interface LoginResponse {
  access_token: string;
  refresh_token: string;
  userId: number;
}

interface LoginData {
  email: string;
  password: string;
}

const Login = () => {
  const [email, setEmail] = useState("Ai@gmail.com");
  const [password, setPassword] = useState("pass123");
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { userInfo, checkAuthStatus } = useAuth();

  useEffect(() => {
    // If user is already authenticated, redirect to index page
    if (userInfo) {
      router.replace("/");
    }
  }, [userInfo, router]);

  const handleLogin = async () => {
    setIsLoading(true);
  
    try {
      const result = await fetch("http://192.168.1.9:3000/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const response = await result.json();
  
      if (response.access_token) {
        // Save info in local storage
        await AsyncStorage.setItem("access_token", response.access_token);
        await AsyncStorage.setItem("refresh_token", response.refresh_token);
        await AsyncStorage.setItem("user", JSON.stringify(response.user));
  
        await checkAuthStatus();
        setIsLoading(false);
        router.replace("/");
      } else if (response.error) {
        // Handle specific error cases
        if (response.statusCode === 401) {
          Alert.alert("Login Failed", response.message);
        } else if (response.statusCode === 400) {
          Alert.alert("Login Failed", response.message.join("\n"));
        } else {
          Alert.alert("Login Failed", "Unexpected error occurred.");
        }
      } else {
        // Fallback in case of unexpected response structure
        Alert.alert("Login Failed", "Please check your credentials and try again.");
      }
    } catch (error) {
      setIsLoading(false);
      // Handle network or fetch errors
      console.error("Login Error:", error);
      Alert.alert("Login Failed", "An error occurred. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };
  

  return (

    
    <View style={styles.container}>

     {isLoading && <Loader />}
  
 
      <View style={styles.overlay}>
        <Text style={styles.welcome}>Welcome Back To SportFinder!</Text>
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
        <TouchableOpacity
          style={styles.loginButton}
          onPress={() => handleLogin()}
          >
          <Text style={styles.loginButtonText}>LOG IN</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push("register")}>
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
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Adding a semi-transparent overlay for better text visibility
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff", // Background color for inputs to make text readable
  },
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff0066",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  welcome: {
    color: "#fff",
    fontWeight: "bold",
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  signUpText: {
    marginTop: 20,
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default Login;
