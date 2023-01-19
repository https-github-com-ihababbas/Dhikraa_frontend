
'use client';

import React from "react";

import ACard from '../components/aboutCards'

import style from '../styles/aboutus.module.css'

export default function About() {
    return (
        <>
   
       
        <div className="inline border-2 border-red-900 justify-self-center bg-white dark:bg-black dark:text-white" >
            <h2 className="m-3 text-2xl text-black italic font-bold text-center dark:text-white " >من نحن وماذا نفعل</h2>
            <p className="w-6/12 m-10 text-gray-700 text-center dark:text-white  " style={{ marginLeft: "25%" }}>
            Dhikraa's mission is to keep the people have a good experience with an Islamic website that has many features to use and get a good knowledge, also to listen to Quran , git a simple quiz, In addition to make your plan on it ad keep on the right road.  
            </p>
            
      <h5 class="m-3 text-2xl italic font-bold text-center text-black dark:text-white">Our Company Values</h5>
      <p class="w-6/12 m-10 text-gray-700 text-center dark:text-white" style={{ marginLeft: "25%" }}>
      These are the core principles upon which Dhikraa was built, every person has a good side and ha/she can better but maybe he/she needs some help to we plan to give him/her a very good Atmosphere.
         </p>
         <img  className={style.aboutusimage} src="/assets/cover.png" alt=""/>
         
          <ACard />

          <div className={style.part2}>
        <h1 className="m-3 text-2xl italic font-bold text-center "style={{color:"#02c180"}}>Dhikraa By The Numbers</h1>
        <div className={style.part1}>
          <div className={style.inner}>
          <h1  style={{color:"#02c180"}}>2023</h1>
          <p className={`${style.p1} dark:text-white`}   style={{color:"#092953"}}>Year Founded</p>
          </div>
          <div className={style.inner}>
          <h1  style={{color:"#02c180"}}>50+</h1>
          <p className={`${style.p1} dark:text-white`} style={{color:"#092953"}}>Available Readers</p>
          </div>
          <div className={style.inner}>
          <h1  style={{color:"#02c180"}}>1000+</h1>
          <p className={`${style.p1} dark:text-white`}  style={{color:"#092953"}}>Active Users</p>
          </div>
          <div className={style.inner}>
          <h1  style={{color:"#02c180"}}>75</h1>
          <p className={`${style.p1} dark:text-white`}  style={{color:"#092953"}}>Zamzm Per Mounth</p>
          </div>
          <div className={style.inner}>
          <h1  style={{color:"#02c180"}}>300+ JD</h1>
          <p className={`${style.p1} dark:text-white`} style={{color:"#092953"}}>Average Charity money</p>
          </div>
          <div className={style.inner}>
          <h1  style={{color:"#02c180"}}>12</h1>
          <p className={`${style.p1} dark:text-white`}  style={{color:"#092953"}}>Cities Served</p>
          </div>
        </div>
        <p className={`${style.p1} dark:text-white`} style={{color:"#092953"}}>
        We're dedicated to our people, guided by our values and powered by our culture. This is the driving force behind our success. It's what has taken us from a 5-person startup to a global team of hundreds helping
        people make billions of dollars in sales and others relaxing after a full two week.
        </p>
         </div>
        </div>
        </>
 
    )
}