import React, { useState, useRef, useMemo, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
} from "react-native";
import BottomSheet, {
  BottomSheetScrollView,
  BottomSheetTextInput,
} from "@gorhom/bottom-sheet";
import { Ionicons } from "@expo/vector-icons";
import { COLORS } from "@/constants/theme";
import { useRouter } from "expo-router";
import { useAuth } from "@/app/context/AuthContext";
import AuthService from "@/app/lib/auth";



const LoginForm = () => {

  const [email, setEmail] = useState("bouchamayasssine@gmail.com");
  const [password, setPassword] = useState("pass123");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );
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

    // fetch user info from server
    const result = await AuthService.Login(email, password);
    setIsLoading(false);

    if (result) {
      router.replace("/");
      await checkAuthStatus();
      console.log("Login successful");
    } else {
      console.log("Login failed");
    }
   
  };



  const handleSubmit = async () => {
    // Basic input validation
    const newErrors: { email?: string; password?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
 


    await  handleLogin()
      console.log("Login with email:", email, "password:", password);
    }
  };

  return (

<>
<Text style={styles.welcome}>Welcome To AirBnb Clone!</Text>

<BottomSheetTextInput
          value={email}
          onChangeText={setEmail}
          placeholder="Enter Email"
          style={[styles.input, errors.email ? styles.inputError : null]}
        />
        <BottomSheetTextInput
          value={password}
          onChangeText={setPassword}
          placeholder="Enter Password"
          secureTextEntry
          style={[styles.input, errors.password ? styles.inputError : null]}
          />
        <TouchableOpacity onPress={handleSubmit} style={styles.loginButton}>
          <Text style={styles.loginButtonText}>{isLoading ? 'Loading' :"Login"}</Text>
        </TouchableOpacity>
   
      </>     

  );
};

const styles = StyleSheet.create({
  contentContainer: {
    flexGrow: 1,

    padding: 20,
  },
  inputError: {
    borderColor: "red",
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
  loginButton: {
    width: "100%",
    padding: 15,
    backgroundColor: "#ff0066",
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 10,
  },
  loginButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  sheetContainer: {
    backgroundColor: "#fff",
    elevation: 4,
    shadowColor: "#000",
    shadowOpacity: 0.3,
    shadowRadius: 4,
    zIndex: 999,
    shadowOffset: {
      width: 1,
      height: 1,
    },
  },
  welcome: {
    color: COLORS.black,
    fontWeight: "bold",
    fontSize:30,
    textAlign: "center",
    width: "100%",
    paddingBottom:20
  },
});

export default LoginForm;
