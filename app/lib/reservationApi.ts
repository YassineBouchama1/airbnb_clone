import axios from "axios";


export const BookingService = async ({Host_code}:{Host_code:string}) => {

  const res = await fetch("http://192.168.1.4:3000/reservation", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjliZmNhNzU0MWY2YjNlNGUwMmVhMTkiLCJpYXQiOjE3MjE1ODk2MjZ9.BkZ43nlCDWstpnMhmmBLG3uocGBhjm7BRXrbYQ9uHTs`,
    },
    body: JSON.stringify({
      HotelId: Host_code,
      checkInDate: "2023-09-21T14:30:00Z",
      checkOutDate: "2023-09-29T14:30:00Z",
    }),
  });

  return res.json();
};



export const GetReservations = async () => {
    
    const baseUrl = "http://192.168.1.4:3000";

    try {
      const url = `${baseUrl}/reservation`;
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer `, // Replace with your actual authorization token
      };
  
      const config = {
       method: "GET",
        url,
        headers,
      };  
  
      const response = await axios(config);

      console.log(response.data)
      return response.data;
    } catch (error) {
      console.error("Error fetching bookings:", error);
      // return { error: error };
        throw error;
    }
  };




