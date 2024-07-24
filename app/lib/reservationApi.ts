import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithTimeout } from "../helpers/fetchWithTimeout";

export const CreateReservation = async ({
  Host_code,
}: {
  Host_code: string;
}) => {

  const token = await AsyncStorage.getItem('access_token');

  try {
    const response = await fetchWithTimeout(
      "http://192.168.227.45:3000/reservation",
      {
        timeout: 8000, // Adjust the timeout value as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          HotelId: Host_code,
          checkInDate: "2023-09-21T14:30:00Z",
          checkOutDate: "2023-09-29T14:30:00Z",
        }),
      }
    );

    return await response.json();
  } catch (error: any) {
    // if the timeout is reached
    if (error.name === "AbortError") {
      throw error.name;
    }
    // Handle network or fetch errors
    console.error("Login Error:", error);
    throw error;
  }
};

export const LoadReservations = async () => {

const token = await AsyncStorage.getItem('access_token');

  try {
    const response = await fetchWithTimeout(
      "http://192.168.227.45:3000/reservation",
      {
        timeout: 8000, // Adjust the timeout value as needed
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
    const res = await response.json();

    if (res.error) {
      throw res.message;
    }

    return res;
  } catch (error: any) {

    // if the timeout is reached
    if (error.name === "AbortError") {
      throw error.name;
    }
    // Handle network or fetch errors
    console.error("Login Error:", error);
    throw error;
  }
};
