"use client"
import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import Swal from 'sweetalert2'
import style from "../styles/signup.module.css"
import Image from "next/image";
import email from "public/assets/email.png";
import home_img from 'public/assets/Home_img1.png';
import logo from 'public/assets/logogray.png';


export default function SignUP() {



    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit")
        console.log(e.target.username.value)

        const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/register/`;
        const obj = {
            username: e.target.username.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            birthday: e.target.birthday.value,
            phone_number: e.target.phone_number.value,
            location: e.target.location.value,
            gender: e.target.gender.value,
            email: e.target.email.value,
            password: e.target.password.value,
            password2: e.target.password2.value,
        };
        console.log(obj)

        axios
            .post(url, obj)
            .then((result) => {
                const res=result.data
                console.log(result);

                if (res.hasOwnProperty("response")){
                    
                    Swal.fire({  
                      
                        icon: 'success',
                        title:`تم انشاء حساب جديد باسم ${result.data.username}`,
                        showConfirmButton: false,
                        timer: 1500
                     })
                }else if (res.hasOwnProperty("username")){
                    
                    Swal.fire({  
                        icon: 'error',  
                        title:`${result.data.username}`,
                        showConfirmButton: false,
                        timer: 1500
                     })
                }else if (res.hasOwnProperty("email")){
                    
                    Swal.fire({  
                        icon: 'error',  
                        title:`${result.data.email}`,
                        showConfirmButton: false,
                        timer: 1500
                     })
                    }
            })
            .catch((err) => {
                console.log("signup error", err);
                const res =err.response.data
                console.log(res.hasOwnProperty("password"))
                if (res.hasOwnProperty("password")){
                    
                    Swal.fire({  
                        icon: 'error',  
                        title:`${res.password}`,
                        showConfirmButton: false,
                        timer: 1500
                     })
                    }
            });

    };





    return (
        <div class={style.wp_caption}>
            <Image
                src={home_img}
                alt="background"
                className={style.demo} />
            <div class={style.wp_caption_text}>
                <div class="w-full h-full">
                    <div class="leading-loose ml-96 pl-20 ">
                        <form action="" onSubmit={handleSubmit} className="max-w-lg p-10 m-4 text-right bg-white bg-opacity-25 rounded shadow-xl">
                            <div className="mb-1 ">

                                <div className="flex items-center py-4">
                                    <div className="w-full space-y-2 text-xs">
                                        <input placeholder="اسم المستخدم" className="text-right block w-full h-10 px-4 text-[#252f0b] border rounded-lg appearance-none bg-grey-lighter border-grey-lighter" required="required" type="text" name="username" id="username" />
                                        <p className="hidden text-xs text-red">.الرجاء ملء هذه الخانة</p>
                                    </div>
                                    <div className="flex-none ml-4 overflow-hidden h-11 w-11 bg-[#3a451c] rounded-full p-1  ">
                                        <Image className="object-cover w-12 h-12 mr-4" src={logo} alt="Avatar Upload" />

                                    </div>
                                </div>
                            </div>
                            
                            <div className="flex-row w-full py-2 text-xs md:flex md:space-x-4">
                                <div className="w-full mb-3 space-y-2 text-xs">
                                    <input placeholder="العائلة" className="text-right block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-[#252f0b] border-grey-lighter" required="required" type="text" name="last_name" id="last_name" />
                                    <p className="hidden text-xs text-red">.الرجاء ملء هذه الخانة</p>
                                </div>
                                
                                <div className="w-full mb-3 space-y-2 text-xs">
                                    <input placeholder="الإسم" className="text-right block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-[#252f0b] border-grey-lighter" required="required" type="text" name="first_name" id="first name" />
                                    <p className="hidden text-xs text-red">.الرجاء ملء هذه الخانة</p>
                                </div>
                            </div>
                            
                            <div className="w-full mb-3 space-y-2 text-xs text-right">
                                <div className="relative flex h-10 mb-4 ">
                                    <input type="email" className="text-right relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal text-right border border-l-0 rounded-lg text-[#252f0b] rounded-l-none border-grey-light focus:border-blue focus:shadow" placeholder="البريد الالكتروني" name="email" id="email" />
                                    <Image
                                        className="block w-auto lg:hidden "
                                        src={email}
                                        alt="email"

                                    />
                                    <Image
                                        className="hidden w-10 lg:block"
                                        src={email}
                                        alt="email"
                                    />
                                </div>
                            </div>
                            
                            <div className="w-full py-2 text-xs md:flex md:flex-row md:space-x-4">
                                <div className="flex flex-col w-full mb-3">
                                    <input placeholder="تاريخ الميلاد" className="text-right block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-[#252f0b] border-grey-lighter" required="required" type="date" name="birthday" id="birthday" />
                                </div>

                                <div className="flex flex-col w-full mb-3">
                                    <input placeholder="مكان الإقامة" className="text-right block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-[#252f0b] border-grey-lighter" required="required" type="text" name="location" id="location" />
                                    <p className="hidden mt-3 text-sm text-red-500" id="error">الرجاء ملء هذه الخانة.</p>
                                </div>
                                
                            </div>

                            <div className="w-full text-xs md:flex md:flex-row md:space-x-4">
                                <div className="flex flex-col w-full mb-3">
                                    <input placeholder="رقم الهاتف" className="text-right block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-[#252f0b] border-grey-lighter" required="required" type="text" name="phone_number" id="phone_number" />
                                </div>

                                <div className="flex flex-col w-full mb-3">
                                    <select className="text-right block w-full h-10 px-4 border rounded-lg bg-grey-lighter text-[#252f0b] border-grey-lighter md:w-full " required="required" name="gender" id="gender">
                                        <option value="">الجنس</option>
                                        <option value="female">انثى</option>
                                        <option value="male">ذكر</option>
                                    </select>
                                    <p className="hidden mt-3 text-sm text-red-500" id="error">.الرجاء ملء هذه الخانة</p>
                                </div>
                                
                            </div>

                            <div className="w-full py-2 text-xs md:flex md:flex-row md:space-x-4">
                                <div className="flex flex-col w-full mb-3">
                                    <input placeholder="كلمة السر " className="text-right block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter text-[#252f0b]" type="password" name="password" id="password" required="required" />
                                </div>
                                <div className="flex flex-col w-full mb-3">
                                    <input placeholder="اعادة كلمة السر " className="text-right block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-[#252f0b] border-grey-lighter" type="password" name="password2" id="password2" required="required" />
                                    <p className="hidden mt-3 text-sm text-red-500" id="error">الرجاء ملء هذه الخانة.</p>
                                </div>
                            </div>

                            <div className="flex mt-5 md:block ml-[60%]">
                                <button type="submit" className="  py-1 px-2  text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                                    <div className="text-base font-mono font-bold pt-0.5 px-2">
                                        إنشاء حساب جديد
                                    </div>

                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>





        </div>
    );
}
