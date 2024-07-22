import AsyncStorage from '@react-native-async-storage/async-storage';



export const logout = async () => {
    await AsyncStorage.removeItem('access_token');
   await AsyncStorage.removeItem('refresh_token');
await AsyncStorage.removeItem('user');
// await AsyncStorage.removeItem('user');
    return true
};





