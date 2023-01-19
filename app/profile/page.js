"use client"
import { use } from "react";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import useSWR from 'swr'
import axios from "axios";
import Link from "next/link";

export default function Profile() {
  const x = localStorage.getItem("username")



  //Data Fetching part
  const { tokens } = useContext(AuthContext);
  const access = localStorage.getItem("access")
  // console.log("tokens", tokens);

  const config = {
    headers: {
      'Authorization': `Bearer ${access}`
    }
  }
  const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/users/${x}`;
  // console.log(`Bearer ${access}`);

  const fetcher = url => axios.get(url, config).then(res => res.data);
  // console.log("fetcher",fetcher)

  const { data, error, isLoading } = useSWR(url, fetcher);
  // console.log('data form profile',data)

  if (data){
    localStorage.setItem("userId", data.id);
    // console.log("userId", data.id)
  }
  if (error) return <div>failed to load</div>
  if (isLoading) return <div>loading...</div>


  return (
    <>
      <div className="text-black">
        <div className="px-[30%]">
          {/* <h1>welcam {data.first_name} {data.last_name}</h1> */}
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
              <h2 className="font-sans text-lg font-bold text-black">{data.first_name} {data.last_name}</h2>

            </div>
            <div className="flex justify-center pb-3 text-white">
              <div className="p-3 rounded-sm shadow-sm ">
                <div className="flex items-center space-x-2 font-semibold leading-8 text-gray-900">
                  <span className="text-black">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </span>
                  <span className="text-lg font-bold tracking-wide">About</span>
                </div>
                <div className="text-gray-700">
                  <div className="grid text-sm md:grid-cols-2">
                    <div className="grid grid-cols-2 ">
                      <div className="px-4 py-2 font-semibold  text-[#ffffff]">First Name</div>
                      <div className="px-2 py-2 text-[#ffffffe1]">{data.first_name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-[#ffffff]">Last Name</div>
                      <div className="px-2 py-2 text-[#ffffffe1]" >{data.last_name}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-[#ffffff]">Gender</div>
                      <div className="px-2 py-2 text-[#ffffffe1]">{data.gender}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-[#ffffff]">Contact No.</div>
                      <div className="px-2 py-2 text-[#ffffffe1]" >{data.phone_number}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-[#ffffff]"> Address</div>
                      <div className="px-2 py-2 text-[#ffffffe1]">{data.location}</div>
                    </div>
                    {/* <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold">Permanant Address</div>
                      <div className="px-4 py-2">Arlington Heights, IL, Illinois</div>
                    </div> */}
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-[#ffffff]">Birthday</div>
                      <div className="px-2 py-2 text-[#ffffffe1]">{data.birthday}</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold text-[#ffffff]">Email</div>
                      <div className=" py-2 text-[#ffffffe1]">
                        <Link className=" text-[#ffffffe1]" href={data.email}>{data.email}</Link>
                      </div>
                    </div>
                  </div>
                </div>
                <button className="block w-full p-3 my-4 text-sm font-semibold text-blue-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs">Show
                  Full Information</button>
              </div>
            </div>
          </div>





        </div>






      </div>


    </>
  )
}
{/* <div className="pr-3 mr-3 text-center border-r">
                <h2>34</h2>
                <span>Photos</span>
              </div>
              <div className="text-center">
                <h2>42</h2>
                <span>Friends</span>
              </div> */}