import AsyncStorage from "@react-native-async-storage/async-storage";
import { fetchWithTimeout } from "../helpers/fetchWithTimeout";
import dayjs from "dayjs";


interface ReservationData {
  Host_code: string;
  startDate: dayjs.Dayjs | string;
  endDate: dayjs.Dayjs | string;
}

const URL = 'http://192.168.0.170:3000/hostel';


export const CreateReservation = async ({
  Host_code,
  startDate,
  endDate,
}: ReservationData) => {
  const token = await AsyncStorage.getItem("access_token");


  if (!token) {
    throw new Error("No access token found");
  }
  try {
    const response = await fetchWithTimeout(
      URL,
      {
        timeout: 8000, // Adjust the timeout value as needed
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          HotelId: Host_code,
          checkInDate: startDate,
          checkOutDate: endDate,
        }),
      }
    );

    return await response.json();
  } catch (error: any) {
    // if the timeout is reached
    if (error.name === "AbortError") {
      throw new Error("Timout error");
    }
    // Handle network or fetch errors
    console.error("Login Error:", error);
    throw new Error("Unspected Error ");
  }
};

export const LoadHostels = async (selectedCategory:string) => {

  try {
    const response = await fetchWithTimeout(
      URL+'?cat='+selectedCategory,
      {
        timeout: 8000, // Adjust the timeout value as needed
        method: "GET",
        headers: {
          "Content-Type": "application/json"
        
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
      throw new Error("Timout error");
    }
    // Handle network or fetch errors
    console.error("Login Error:", error);
    throw new Error("Unspected Error ");
  }
};
