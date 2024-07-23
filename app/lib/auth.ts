import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useAuth } from "../AuthContext";
import { Alert } from "react-native";

export const LoginService = async (email:string,password:string) => {


    const router = useRouter()

        const result = await fetch("http://192.168.1.6:3000/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({email,password} ),
        });
    
        
      return await result.json();
    
    //     if (response.access_token) {
    //       // Save info in local storage
    //       await AsyncStorage.setItem("access_token", response.access_token);
    //       await AsyncStorage.setItem("refresh_token", response.refresh_token);
    //       await AsyncStorage.setItem("user", JSON.stringify(response.user));
    
    //       await checkAuthStatus();
      
    //       router.replace("/");
    //     } else if (response.error) {
    //       // Handle specific error cases
    //       if (response.statusCode === 401) {
    //         Alert.alert("Login Failed", response.message);
    //       } else if (response.statusCode === 400) {
    //         Alert.alert("Login Failed", response.message.join("\n"));
    //       } else {
    //         Alert.alert("Login Failed", "Unexpected error occurred.");
    //       }
    //     } else {
    //       // Fallback in case of unexpected response structure
    //       Alert.alert("Login Failed", "Please check your credentials and try again.");
    //     }
    //   } catch (error) {
     
    //     // Handle network or fetch errors
    //     console.error("Login Error:", error);
    //     Alert.alert("Login Failed", "An error occurred. Please try again later.");
    //   } 
  };