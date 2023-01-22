"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import UpdatePassword from "./UpdatePassword"
import UpdateProfile from "./UpdateProfile"


export default function Profile() {
  const x = localStorage.getItem("username") // get the username from the local storage 
  const [changePasswordFlag, setchangePasswordFlag] = useState(false);    // to chang password
  const [userData, setUserData] = useState({});    // to save the data 
  const [changeProfileFlag, setchangeProfileFlag] = useState(false);    // to edit profile information

  //Data Fetching part
  const { tokens, logout } = useContext(AuthContext);
  const access = localStorage.getItem("access")
  const config = {
    headers: {
      'Authorization': `Bearer ${access}`
    }
  }
  const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/users/${x}`;


  useEffect(() => {
    axios
      .get(url, config)
      .then((result) => {
        console.log(result.data);
        setUserData(result.data);
        localStorage.setItem("userId", result.data.id);
        localStorage.setItem("is_superuser",result.data.is_superuser);
        localStorage.setItem("userlocation",result.data.location);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
 
  // change password feature 

  const ChangePasswordHandler = () => {
    console.log('change password')
    setchangePasswordFlag(true)


  }
  const closeModule = () => {
    setchangePasswordFlag(false);
    setchangeProfileFlag(false)
  };

  //update profile
  const ChangeprofileHandler=()=>{
    setchangeProfileFlag(true)
    
  }



  return (

    <section>
      
      {tokens ? <div className="text-black">
          {/* <h1>welcam {data.first_name} {data.last_name}</h1> */}
        <div className="px-[30%] py-3">
          <div className="max-w-full  overflow-hidden shadow-xl bg-[#2293a7] rounded-3xl ">
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
              <h2 className="font-sans text-lg font-bold text-black">{userData.first_name} {userData.last_name}</h2>

            </div>
            <div className="flex justify-center pb-3 text-white">
              <div className="p-1 rounded-sm shadow-sm ">
                <div className="flex items-center justify-end mb-2 mr-6 space-x-2 font-semibold leading-8 text-gray-900">
                  <span className="text-lg font-bold tracking-wide">المعلومات الشخصية</span>
                  <span className="text-black">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </span>
                </div>
                <div className="text-gray-700">
                  <div className="grid text-sm md:grid-cols-2">
                    <div className="grid grid-cols-2">
                      <div className=" py-2 text-[#ffffffe1] flex justify-end" >{userData.last_name}</div>
                      <div className="px-4 py-2  font-semibold text-[#ffffff] flex justify-end"> العائلة</div>
                    </div>
                    <div className="grid grid-cols-2 ">
                      <div className="px-2 py-2 text-[#ffffffe1] flex justify-end">{userData.first_name}</div>
                      <div className="px-4 py-2 font-semibold  text-[#ffffff] flex justify-end">الأسم </div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 text-[#ffffffe1] flex justify-end">{userData.gender}</div>
                      <div className="px-4 py-2 font-semibold text-[#ffffff] flex justify-end">النوع</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className=" py-2 text-[#ffffffe1] flex justify-end">{userData.location}</div>
                      <div className="px-4 py-2 font-semibold text-[#ffffff] flex justify-end"> مكان الاقامه</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 text-[#ffffffe1] flex justify-end">{userData.birthday}</div>
                      <div className="px-4 py-2 font-semibold text-[#ffffff] flex justify-end">تاريخ الميلاد</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-2 py-2 text-[#ffffffe1] flex justify-end" >{userData.phone_number}</div>
                      <div className="px-4 py-2 font-semibold text-[#ffffff] flex justify-end">رقم الهاتف</div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className="px-4 py-2 font-semibold"></div>
                      <div className="px-4 py-2"></div>
                    </div>
                    <div className="grid grid-cols-2">
                      <div className=" py-2 text-[#ffffffe1] flex justify-end">
                        <Link className=" text-[#ffffffe1] flex justify-end" href="">{userData.email}</Link>
                      </div>
                      <div className="px-4 py-2 font-semibold text-[#ffffff] flex justify-end">البريد الإلكتروني</div>
                    </div>
                  </div>
                </div>
                <div className="grid grid-cols-2">

                  <button onClick={ChangeprofileHandler} className="block w-full p-3 my-4 text-sm font-semibold text-blue-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs">
                    تعديل الملف الشخصي </button>
                  <button onClick={ChangePasswordHandler} className="block w-full p-3 my-4 text-sm font-semibold text-blue-800 rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs">

                    تغيير كلمة السر</button>
                </div>
              </div>
            </div>
          </div>


        </div>
        {changePasswordFlag &&
          <>
           
            <UpdatePassword
              id={userData.id}
              isOpen={changePasswordFlag}
              close={closeModule}

            />
          </>
        }
         {changeProfileFlag &&
          <>
            <div>

              hi
            </div>
            <UpdateProfile
              id={userData.id}
              isOpen={changeProfileFlag}
              close={closeModule}
              setUserData={setUserData}

            />
          </>
        }
      </div> : <h1 classNameName="text-black">سارع بالتسجيل في الموقع لاستخدام هذة الميزة</h1>}

    </section>
  )
}
