"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";

export default function ramdancountdown() {
    var countDownDate = new Date("Mar 22, 2023 18:50:00").getTime();
    const [countDown ,  setcountDown] = useState(0)
    // Update the count down every 1 second
    var x = setInterval(function() {
    
      // Get today's date and time
      var now = new Date().getTime();
    
      // Find the distance between now and the count down date
      var distance = countDownDate - now;
    
      // Time calculations for days, hours, minutes and seconds
      var days = Math.floor(distance / (1000 * 60 * 60 * 24));
      var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      var seconds = Math.floor((distance % (1000 * 60)) / 1000);
    
      // Display the result in the element with id="demo"
      setcountDown(days + "d " + hours + "h "
      + minutes + "m " + seconds + "s")
    
      // If the count down is finished, write some text
      if (distance < 0) {
        clearInterval(x);
        //document.getElementById("demo").innerHTML = "EXPIRED";
      }
    }, 1000);

    
  return (
    <>
      <h1 className="text-4xl justify-self-center text-center dark:text-white" > باقي لرمضان</h1>   
   <h1  className="text-4xl justify-self-center text-center dark:text-white" >{countDown}</h1>
   </>

  )
  

}