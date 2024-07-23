



// create a new wishlist 
export const create = async ({Host_code}:{Host_code:string}) => {

  const res = await fetch("http://192.168.1.6:3000/wishlist", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjliZmNhNzU0MWY2YjNlNGUwMmVhMTkiLCJpYXQiOjE3MjE1ODk2MjZ9.BkZ43nlCDWstpnMhmmBLG3uocGBhjm7BRXrbYQ9uHTs`,
    },
    body: JSON.stringify({
      HotelId: Host_code
    
    }),
  });

  return res.json();
};




 const findOne = async ({Host_code}:{Host_code:string}) => {


      const res = await fetch(`http://192.168.1.4:3000/wishlist/${Host_code}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjliZmNhNzU0MWY2YjNlNGUwMmVhMTkiLCJpYXQiOjE3MjE1ODk2MjZ9.BkZ43nlCDWstpnMhmmBLG3uocGBhjm7BRXrbYQ9uHTs`,
        },
        
      });
    
      return res.json();
    };
    






  const WishListService = {
    findOne,
    create
  
  };
  
  export default WishListService;

// export const GetBookings = async (method = "GET", body = {}) => {
//   const baseUrl = "http://192.168.1.6:3000";

//   try {
//     const url = `${baseUrl}/reservation`;
//     const headers = {
//       "Content-Type": "application/json",
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjliZmNhNzU0MWY2YjNlNGUwMmVhMTkiLCJpYXQiOjE3MjE1ODk2MjZ9.BkZ43nlCDWstpnMhmmBLG3uocGBhjm7BRXrbYQ9uHTs`, // Replace with your actual authorization token
//     };

//     const config = {
//       method,
//       url,
//       headers,
//       data: method === "POST" ? body : undefined,
//     };

//     const response = await axios(config);
//     return response.data;
//   } catch (error) {
//     console.error("Error fetching bookings:", error);
//     // return { error: error };
//       throw error;
//   }
// };

