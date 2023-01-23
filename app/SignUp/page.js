"use client"
import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import Swal from 'sweetalert2'
import style from "../styles/quiz.module.css"
import Image from "next/image";
import logo from "public/assets/signup.png";
import email from "public/assets/email.png";


export default function SignUP() {
    
    const refresh_string = localStorage.getItem("refresh");
    

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Submit")
        console.log(e.target.username.value)

        const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/register/`;
        const obj = {
            username:  e.target.username.value,
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
                console.log(result.data);
            })
            .catch((err) => {
                console.log("signup error", err);
            });

    };





    return (
        <div className={style.back}>
            <div className="relative flex items-center justify-center min-h-screen px-4 py-12 bg-center bg-no-repeat bg-cover sm:px-6 lg:px-8"
            >
                <div className="absolute inset-0 z-0 opacity-60"></div>
                <div className="z-10 w-full max-w-md p-10 space-y-8 bg-white shadow-lg rounded-xl">
                    <div className="grid grid-cols-1 gap-8">
                        <div className="flex flex-col ">
                            <div className="flex flex-col items-center sm:flex-row">
                                <div className="w-full mt-3 sm:w-auto sm:mr-auto sm:mt-0">
                                    <Image
                                        className="block w-auto h-20 lg:hidden "
                                        src={logo}
                                        alt="logo"
                                    />
                                    <Image
                                        className="hidden w-auto h-20 lg:block"
                                        src={logo}
                                        alt="logo"
                                    />
                                </div>
                                <h2 className="ml-auto text-2xl font-semibold text-[#3a451c]" >إنشاء حساب جديد</h2>
                            </div>
                            <div className="mt-5">
                                <form action="" onSubmit={handleSubmit}>
                                    <div className="mb-1 md:space-y-1">

                                        <div className="flex items-center py-2">
                                            <div className="w-full space-y-2 text-xs">
                                                {/* <label className="py-2 font-semibold text-gray-600">اسم المستخدم<abbr title="required"></abbr></label> */}
                                                <input placeholder="اسم المستخدم" className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" name="username" id="username" />
                                                <p className="hidden text-xs text-red">.الرجاء ملء هذه الخانة</p>
                                            </div>
                                            <div className="flex-none ml-4 overflow-hidden border h-11 w-11 rounded-xl">
                                                <img className="object-cover w-12 h-12 mr-4" src="https://images.unsplash.com/photo-1611867967135-0faab97d1530?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1352&amp;q=80" alt="Avatar Upload" />

                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex-row w-full text-xs md:flex md:space-x-4">
                                        <div className="w-full mb-3 space-y-2 text-xs">
                                            {/* <label className="py-2 font-semibold text-gray-600">الأسم<abbr title="required"></abbr></label> */}
                                            <input placeholder="الإسم" className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" name="first_name" id="first name" />
                                            <p className="hidden text-xs text-red">.الرجاء ملء هذه الخانة</p>
                                        </div>
                                        <div className="w-full mb-3 space-y-2 text-xs">
                                            {/* <label className="py-2 font-semibold text-gray-600">العائلة <abbr title="required">*</abbr></label> */}
                                            <input placeholder="العائلة" className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" name="last_name" id="last_name" />
                                            <p className="hidden text-xs text-red">.الرجاء ملء هذه الخانة</p>
                                        </div>
                                    </div>
                                    <div className="w-full mb-3 space-y-2 text-xs text-right">
                                        {/* <label className="py-2 mr-10 font-semibold text-gray-600">البريد الالكتروني</label> */}
                                        <div className="relative flex h-10 mb-4 ">

                                            <input type="email" className="relative flex-auto flex-grow flex-shrink w-px h-10 px-3 leading-normal text-right border border-l-0 rounded-lg rounded-l-none border-grey-light focus:border-blue focus:shadow" placeholder="البريد الالكتروني" name="email" id="email" />
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
                                    <div className="w-full text-xs md:flex md:flex-row md:space-x-4">
                                        <div className="flex flex-col w-full mb-3">
                                            {/* <label className="py-2 font-semibold text-gray-600">تاريخ الميلاد</label> */}
                                            <input placeholder="تاريخ الميلاد" className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="date" name="birthday" id="birthday" />
                                        </div>
                                        <div className="flex flex-col w-full mb-3">
                                            {/* <label className="py-2 font-semibold text-gray-600">مكان الاقامة<abbr title="required">*</abbr></label> */}
                                            <input placeholder="مكان الإقامة" className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" required="required" type="text" name="location" id="location" />

                                            <p className="hidden mt-3 text-sm text-red-500" id="error">الرجاء ملء هذه الخانة.</p>
                                        </div>
                                    </div>
                                    <div className="w-full text-xs md:flex md:flex-row md:space-x-4">
                                        <div className="flex flex-col w-full mb-3">
                                            {/* <label className="py-2 font-semibold text-gray-600">رقم الهاتف </label> */}
                                            <input placeholder="رقم الهاتف" className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter"  required="required" type="text" name="phone_number" id="phone_number" />
                                        </div>
                                        <div className="flex flex-col w-full mb-3">
                                            {/* <label className="py-2 font-semibold text-gray-600">الجنس <abbr title="required">*</abbr></label> */}
                                            <select className="block w-full h-10 px-4 border rounded-lg bg-grey-lighter text-grey-darker border-grey-lighter md:w-full " required="required" name="gender" id="gender">

                                                <option value="">الجنس</option>
                                                <option value="female">انثى</option>
                                                <option value="male">ذكر</option>

                                            </select>
                                            <p className="hidden mt-3 text-sm text-red-500" id="error">.الرجاء ملء هذه الخانة</p>
                                        </div>
                                    </div>
                                    <div className="w-full text-xs md:flex md:flex-row md:space-x-4">
                                        <div className="flex flex-col w-full mb-3">
                                            {/* <label className="py-2 font-semibold text-gray-600">تاريخ الميلاد</label> */}
                                            <input placeholder="كلمة السر " className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" type="password" name="password" id="password" required="required" />
                                        </div>
                                        <div className="flex flex-col w-full mb-3">
                                            {/* <label className="py-2 font-semibold text-gray-600">مكان الاقامة<abbr title="required">*</abbr></label> */}
                                            <input placeholder="اعادة كلمة السر " className="block w-full h-10 px-4 border rounded-lg appearance-none bg-grey-lighter text-grey-darker border-grey-lighter" type="password" name="password2" id="password2" required="required" />

                                            <p className="hidden mt-3 text-sm text-red-500" id="error">الرجاء ملء هذه الخانة.</p>
                                        </div>
                                    </div>

                                    <div className="flex mt-5 md:block ml-[60%]">
                                        <button type="submit" className="  py-1.5 px-2  text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                                            <div className="text-base font-mono font-bold pt-0.5 px-2">
                                                إنشاء حساب جديد
                                            </div>

                                        </button>
                                        {/* <button className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-gray-600 bg-white border rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-gray-100" >إلغاء </button> */}
                                        {/* <button className="px-5 py-2 mb-2 text-sm font-medium tracking-wider text-white bg-green-400 rounded-full shadow-sm md:mb-0 hover:shadow-lg hover:bg-green-500">إنشاء حساب جديد</button> */}
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

            </div>


        </div>
    );
}
