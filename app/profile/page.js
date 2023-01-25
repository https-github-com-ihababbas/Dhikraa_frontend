"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import axios from "axios";
import Link from "next/link";
import UpdatePassword from "./UpdatePassword"
import UpdateProfile from "./UpdateProfile"
import style from "../styles/profile.module.css"
import home_img from 'public/assets/Home_img1.png';
import logo from 'public/assets/logogray.png';

export default function Profile() {
  const [changePasswordFlag, setchangePasswordFlag] = useState(false);    // to chang password
  const [userData, setUserData] = useState({});    // to save the data 
  const [changeProfileFlag, setchangeProfileFlag] = useState(false);    // to edit profile information
  const { tokens,  username ,refresh} = useContext(AuthContext);
  const [accessString, setAccessString] = useState("")
  const [refreshString, setRefreshString] = useState("")

  
  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)
    const access = localStorage.getItem("access");
    setAccessString(access)
    refresh(refresh_string);
 
    const config = {
      headers: {
        'Authorization': `Bearer ${access}`
      }
    }
    
    const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/users/${username}`;
    
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

    <div class={style.wp_caption}>
            <Image
                src={home_img}
                alt="background"
                className={style.demo} />
            <div class={style.wp_caption_text}>
                <div class="w-full h-full">
                    <div class="leading-loose ml-96 pl-20 ">
                      
      
      {tokens ? <div className="max-w-lg p-10 m-4 text-right bg-white bg-opacity-25 shadow-xl rounded-3xl">
          {/* <h1>welcam {data.first_name} {data.last_name}</h1> */}

          
        
          
            

            <div className="flex justify-center -mt-8 rounded-lg">
              <Image
                src={logo}
                alt="Picture of the author"
                width={150}
                height={120}
                className="-mt-20 border-2 border-white border-solid px-4 py-2  bg-[#778554] rounded-full" />
            </div>
            <div className="px-3 pt-2 pb-6 text-center ">
              <h2 className="font-sans text-xl font-extrabold text-black ">{userData.first_name} {userData.last_name}</h2>

            </div>
            <div className="flex justify-center pb-3 ">
              <div className="p-1 rounded-sm shadow-sm ">
                <div className="flex items-center justify-end pb-2 mb-4 mr-6 space-x-2 font-semibold leading-8 text-gray-900 border-b-2 border-neutral-500">
                  <span className="text-lg font-extrabold tracking-wide ">المعلومات الشخصية</span>
                  <span className="text-black">
                    <svg className="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
                    </svg>
                  </span>
                </div>
                <div className="text-gray-700">
                  <div className="grid text-sm md:grid-cols-2 ">
                    <div className="grid grid-cols-2 m-1 mb-2 rounded-lg">
                      <div className=" py-2 text-[#252f0be1] rounded-lg bg-white bg-opacity-50 flex justify-center" >{userData.last_name}</div>
                      <div className="pr-4  text-lg font-semibold text-[#252f0b] flex justify-end"> العائلة</div>
                    </div>
                    <div className="grid grid-cols-2 m-1 mb-2 rounded-lg">
                      <div className=" py-2 text-[#252f0be1] rounded-lg bg-white bg-opacity-50 flex justify-center">{userData.first_name}</div>
                      <div className="pr-4  text-lg font-semibold text-[#252f0b] flex justify-end">الأسم </div>
                    </div>
                    <div className="grid grid-cols-2 m-1 mb-2 rounded-lg">
                      <div className=" py-2 text-[#252f0be1] rounded-lg bg-white bg-opacity-50 flex justify-center">{userData.gender}</div>
                      <div className="pr-4  text-lg font-semibold text-[#252f0b] flex justify-end">النوع</div>
                    </div>
                    <div className="grid grid-cols-2 m-1 mb-2 rounded-lg">
                      <div className="  py-2 text-[#252f0be1] rounded-lg bg-white bg-opacity-50 flex justify-center">{userData.location}</div>
                      <div className="pr-4  text-lg font-semibold text-[#252f0b] flex justify-end"> مكان الاقامه</div>
                    </div>
                    <div className="grid grid-cols-2 m-1 mb-2 rounded-lg">
                      <div className=" py-2 text-[#252f0be1] rounded-lg bg-white bg-opacity-50 flex justify-center">{userData.birthday}</div>
                      <div className="pr-4 pl-1 text-lg font-bold text-[#252f0b] flex justify-end">تاريخ الميلاد</div>
                    </div>
                    <div className="grid grid-cols-2 m-1 mb-2 rounded-lg">
                      <div className=" py-2 text-[#252f0be1] rounded-lg bg-white bg-opacity-50 flex justify-center" >{userData.phone_number}</div>
                      <div className="pr-4  text-lg font-semibold text-[#252f0b] flex justify-end">رقم الهاتف</div>
                    </div>
                    
                  </div>
                    <div className="flex justify-end m-1 mb-2 bg-white bg-opacity-50 rounded-lg">
                      <div className=" py-2 text-[#252f0be1] flex justify-end">
                        <Link className=" text-[#252f0be1] flex justify-end" href="">{userData.email}</Link>
                      </div>
                      <div className="px-4 py-2 font-semibold text-[#252f0b] flex justify-end">البريد الإلكتروني</div>
                    </div>
                </div>
                <div className="grid grid-cols-2">

                  <button onClick={ChangeprofileHandler} className="block mx-2 py-3 my-4 text-sm font-semibold  text-white bg-[#3a451c]  bg-opacity-50 rounded-lg hover:bg-gray-100 hover:text-[#3a451c] focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs ">
                    تعديل الملف الشخصي </button>
                  <button onClick={ChangePasswordHandler} className="block mx-2 py-3 my-4 text-sm font-semibold text-white bg-[#3a451c] bg-opacity-50 rounded-lg hover:bg-gray-100 hover:text-[#3a451c] focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs">

                    تغيير كلمة السر</button>
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
              userData={userData}

            />
          </>
        }
      </div> : <h1 classNameName="text-black">سارع بالتسجيل في الموقع لاستخدام هذة الميزة</h1>}

    </div>
    </div>
    </div>
    </div>
  )
}
