import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Video, ResizeMode } from "expo-av";
import { RadioButton } from "react-native-paper";

import { useRouter } from "expo-router";
import Loader from "../shared/loader";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../AuthContext";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [isLoading, setIsLoading] = useState(false);
  const { userInfo, checkAuthStatus } = useAuth();


  const router = useRouter()
  const handleSignUp = async () => {
    setIsLoading(true);
  
    try {
      const result = await fetch("http://192.168.1.9:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({name, email, password ,role}),
      });
  
      const response = await result.json();
  console.log(response);
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
          Alert.alert("Login Failed", typeof response.message === 'object' ?  response.message?.join("\n") : response.message);
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
        <Text style={styles.welcome}>Welcome To AirBnb Clone!</Text>

        <View style={styles.role}>
          <View>
            <Text style={styles.roleText}>User</Text>
            <RadioButton
              value="user"
              status={role === "user" ? "checked" : "unchecked"}
              onPress={() => setRole("user")}
            />
          </View>

          <View style={styles.roleRadio}>
            <Text style={styles.roleText}>Business</Text>

            <RadioButton
              value="business"
              status={role === "business" ? "checked" : "unchecked"}
              onPress={() => setRole("business")}
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

        <TouchableOpacity onPress={() => router.navigate("/login")}>
          <Text style={styles.signInText}>
            Already have an account? Sign in
          </Text>
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
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  input: {
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff",
  },
  roleRadio: {},
  role: {
    flexDirection: "row",
    justifyContent: "center",
    width: "100%",
    gap: 20,
    marginVertical: 10,
  },
  roleLabel: {
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 10,
  },
  roleText: {
    fontSize: 16,
    marginBottom: 5,
    color: "#fff",
  },
  signUpButton: {
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
  signUpButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  orText: {
    marginVertical: 10,
    fontWeight: "bold",
    color: "#fff", // Text color for better visibility
  },
  continueButton: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    backgroundColor: "#fff", // Background color for buttons to make text readable
  },
  continueButtonText: {
    marginLeft: 10,
  },
  socialContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginVertical: 10,
  },
  socialButton: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    flex: 1,
    marginHorizontal: 5,
    backgroundColor: "#fff", // Background color for buttons to make text readable
  },
  socialButtonText: {
    marginLeft: 10,
  },
  signInText: {
    marginTop: 20,
    color: "#fff",
    textDecorationLine: "underline",
  },
});

export default Register;
