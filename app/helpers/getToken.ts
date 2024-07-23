import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { Alert } from "react-native";

export const getToken = async () =>{
const router = useRouter()
    const token = await AsyncStorage.getItem("access_token");

    if (!token) {
      Alert.alert(
        "Login Required",
        "You need to login to book this listing. Please login first.",
        [
          {
            text: "Cancel",
            style: "cancel",
          },
          {
            text: "Login",
            onPress: () => router.push("/login"),
          },
        ]
      );
    }

    return token;
  

}