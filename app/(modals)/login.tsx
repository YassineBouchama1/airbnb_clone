import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Platform,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { useAuth } from "../AuthContext";
import { useRouter } from "expo-router";
import useFetch from "@/hooks/useFetch";
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
  const [email, setEmail] = useState("user@yassine.info");
  const [password, setPassword] = useState("pass123");
  const { fetchData, loading, error } = useFetch<LoginResponse>();

  const router = useRouter();
  const {userInfo, checkAuthStatus } = useAuth();


  useEffect(() => {
    // If user is already authenticated, redirect to index page
    if (userInfo) {
      router.replace('/');
    }
  }, [userInfo, router]);


  const handleLogin = async () => {
    const result = await fetch("http://192.168.1.9:3000/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });
  
    const respo = await result.json();

    if (respo?.access_token) {
      // save info in local storage
      await AsyncStorage.setItem("access_token", respo.access_token);
      await AsyncStorage.setItem("refresh_token", respo.refresh_token);
      await AsyncStorage.setItem("userID", String(respo.userId));
  
      await checkAuthStatus();

      router.replace('/');
  
      return;
    }
    {
      Alert.alert(
        "Login Failed",
        "Please check your credentials and try again."
      );
      console.log('error', error);
    }
  };

  return (
    <View style={styles.container}>
      <Video
        source={require("../../assets/videos/bg1.mp4")}
        style={StyleSheet.absoluteFill}
        resizeMode={ResizeMode.COVER}
        shouldPlay
        isLooping
        isMuted
      />
      {loading && <Text>Loading .....</Text>}
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
