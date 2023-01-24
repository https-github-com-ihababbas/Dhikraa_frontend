"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";
import ramadan_img from 'public/assets/ramadan_image.png'
import Image from "next/image";

export default function ramdancountdown() {
  var countDownDate = new Date("Mar 22, 2023 18:50:00").getTime();
  const [countDown, setcountDown] = useState(0)
  // Update the count down every 1 second
  var x = setInterval(function () {

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
    setcountDown("باقي لقدوم الشهر " + days + " يوم " + hours + " ساعة " + minutes + " دقيقة " + seconds + " ثانية ")
    localStorage.setItem("time", seconds);
    // If the count down is finished, write some text
    if (distance < 0) {
      clearInterval(x);
      //document.getElementById("demo").innerHTML = "EXPIRED";
    }
  }, 1000);
  


  return (
    <section className="mt-24 mb-32">
      <h1 className="text-5xl border-b-2 mx-[29%] border-[#778554] justify-self-center text-center text-[#252f0b] dark:text-white mb-4 pb-2" > رمضان يدنو </h1>

      <div className=" bg-[#949e7b] flex flex-right w-full h-full  justify-between px-32">

        <div className="relative w-1/4 justify-center h-64  ">
          <div
            className="absolute inset-0 bg-gradient-to-r from-[#e5f2c4] to-[#252f0b] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
          </div>
          <div className="relative bg-white shadow-lg sm:rounded-3xl sm:p-1 ">
            <Image className="w-full h-64" src={ramadan_img} />
          </div>
        </div>
        <div className="w-3/4">
          <h1 className="mt-10 text-4xl justify-self-center text-right text-[#252f0b] dark:text-white" >{countDown}</h1>
          <br/>
          <p className="text-2xl text-[#252f0b]  text-right ml-32">رمضان هو مدرسة سنوية تأتينا كل عام ، تدخل علينا في بدايتها وقد تكون صعبة ونشعر في الثقل منها بينما تسير الايام يختلف الشعور بأن انفسنا قد اعتادت على نظام جميل لربما ساعدنا على الالتزام في عبادة او فعل معين ، وقد نكون حزينين في آخره ايامه اذ اننا لم نؤدي الواجبات علينا في هذه المدرسة بالشكل المطلوب</p>
        </div>
      </div>
    </section>

  )
}