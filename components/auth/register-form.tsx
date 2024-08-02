import React, { useState, useRef, useMemo, useEffect, useContext } from "react";
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
import { RadioButton } from "react-native-paper";
import { ThemeContext } from "@/app/context/ThemeContext";



const RegisterForm = () => {

  const [email, setEmail] = useState("bouchamayasssine@gmail.com");
  const [password, setPassword] = useState("pass123");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>(
    {}
  );


 const { userInfo, checkAuthStatus } = useAuth();

 const [name, setName] = useState("");

 const [role, setRole] = useState("user");

 const {formAuth ,setFormAuth} = useContext(ThemeContext)

 const router = useRouter();

 useEffect(() => {
  // If user is already authenticated, redirect to index page
  if (userInfo) {
    router.replace("/");
  }
}, [userInfo, router]);





 const handleSignUp = async () => {
   setIsLoading(true);

   
   const result = await AuthService.Registration({
     name,
     email,
     password,
     role,
   });

  

   // after registration is successful update auth status
   if (result) {
   await setFormAuth(true) //display login form
   await checkAuthStatus();
   setIsLoading(false);
     router.replace("/profile",);
  console.log("Registration successful");
   } else {
     console.log("Registration failed");
     setIsLoading(false);
   }
 };






  const handleSubmit = async () => {
    // Basic input validation
    const newErrors: { email?: string; password?: string,name?: string } = {};
    if (!email) {
      newErrors.email = "Email is required";
    }
    if (!password) {
      newErrors.password = "Password is required";
    }
    if (!name) {
      newErrors.password = "name is required";
    }
   
    setErrors(newErrors);

    // If no errors, submit form
    if (Object.keys(newErrors).length === 0) {
 


  await    handleSignUp()
      console.log("Register with email:", email, "password:", password);
    }
  };

  return (

<>
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

  <View >
    <Text style={styles.roleText}>Business</Text>

    <RadioButton
      value="business"
      status={role === "business" ? "checked" : "unchecked"}
      onPress={() => setRole("business")}
    />
  </View>
</View>

<BottomSheetTextInput
          value={name}
          onChangeText={setName}
          placeholder="Enter Name"
          style={[styles.input, errors.email ? styles.inputError : null]}
        />
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
        <TouchableOpacity onPress={handleSubmit} style={{...styles.loginButton,opacity:isLoading?0.5:1}}>
          <Text style={styles.loginButtonText}>{isLoading ? 'Loading' :"Register"}</Text>
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
    paddingBottom:5
  },
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
    color: COLORS.primary,
  },
});

export default RegisterForm;
