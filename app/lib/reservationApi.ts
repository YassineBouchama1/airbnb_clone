import React from 'react'

export const BookingService = async ()=> {
    console.log('clicked 2')


  const res =  await fetch("http://192.168.1.6:3000/reservation", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
         Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2NjliZmNhNzU0MWY2YjNlNGUwMmVhMTkiLCJpYXQiOjE3MjE1ODk2MjZ9.BkZ43nlCDWstpnMhmmBLG3uocGBhjm7BRXrbYQ9uHTs`,
        },
        body: JSON.stringify({
          HotelId : "3",
          checkInDate: "2023-09-21T14:30:00Z",
          checkOutDate: "2023-09-29T14:30:00Z",
        }),
      });


      return res.json();
}
