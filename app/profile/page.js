"use client"
import { use } from "react";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import useSWR from 'swr'
import axios from "axios";

export default function Profile() {
  const x = localStorage.getItem("username")



  //Data Fetching part
  const { tokens } = useContext(AuthContext);
  const access = localStorage.getItem("access")
  console.log("tokens", tokens);

  const config = {
    headers: {
      'Authorization': `Bearer ${access}`
    }
  }
  const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/users/${x}`;
  console.log(`Bearer ${access}`);

  const fetcher = url => axios.get(url, config).then(res => res.data);
  // console.log("fetcher",fetcher)

  const { data, error, isLoading } = useSWR(url, fetcher);
  console.log(error)

  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>


  return (
    <>
      <div className="text-black">
        <div className="px-[33%]">
          <div className="max-w-full my-3 overflow-hidden bg-blue-500 shadow-xl rounded-3xl ">
            <Image

              src="/assets/ramadan.jpg"
              alt="Picture of the author"
              width={200}
              height={200}
              className="w-full h-[200px]"
            />


            <div className="flex justify-center -mt-8">
              <Image
                src="/assets/profile.jpg"
                alt="Picture of the author"
                width={200}
                height={200}
                className="-mt-3 border-2 border-white border-solid rounded-full h-3/6" />
            </div>
            <div className="px-3 pt-2 pb-6 text-center">
              <h2 className="font-sans text-sm text-white bold">{data.first_name} {data.last_name}</h2>
              
              <p className="mt-2 font-sans font-light text-white">Hello, I am from another the other side!</p>
            </div>
            <div className="flex justify-center pb-3 text-white">
              <div className="pr-3 mr-3 text-center border-r">
                <h2>34</h2>
                <span>Photos</span>
              </div>
              <div className="text-center">
                <h2>42</h2>
                <span>Friends</span>
              </div>
            </div>
          </div>





        </div>






      </div>

    </>
  )
}