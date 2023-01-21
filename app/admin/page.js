"use client";
import React from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/auth";
import Link from "next/link";

export default function AdminPanel() {
  const { tokens, refresh } = useContext(AuthContext);
  const refresh_string = localStorage.getItem("refresh");
  refresh(refresh_string);
  const access = localStorage.getItem("access");
  const config = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  const admin = localStorage.getItem("is_superuser");

  return (
    <>
      
      <section className="text-gray-600 bg-teal-200 body-font pb-36 flex justify-center items-center ">
      <div className="container pt-32 pd-64 mx-auto justify-center  h-full ">
          <div className="flex flex-wrap text-center justify-center">
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500 shadow-2xl mx-8 rounded-2xl ">
              <div className=" flex items-center  justify-between px-4 h-full  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div className="bg-gradient-to-tr from-green-500 to-green-500 w-32 h-32  rounded-full shadow-2xl shadow-green-400 border-white  border-dashed border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white text-2xl">المستخدمون</h1>
                  </div>
                </div>
                <div>
                  <h2 className="text-gray-900 text-2xl font-bold mb-6">قسم المستخدمون</h2>
                  <Link href='/admin/users' className="text-lg mt-6 px-4 py-2 bg-green-400  text-white rounded-lg  tracking-wider hover:bg-green-500 outline-none">
                    الإنتقال
                  </Link>
                </div>
                
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500  shadow-2xl mx-8 rounded-2xl">
              <div className=" flex items-center  justify-between p-4  rounded-lg bg-white shadow-indigo-50 shadow-md">
                <div className="bg-gradient-to-tr from-cyan-500 to-cyan-400 w-32 h-32  rounded-full shadow-2xl shadow-cyan-400 border-white  border-dashed border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-white text-2xl text-bold">الإختبارات</h1>
                  </div>
                </div>
                <div>
                  <h2 className="text-gray-900 text-2xl  mb-6 font-bold">قسم الإختبارات</h2>
                  <Link href='admin/quizzes' className="text-lg mt-6 px-4 py-2 bg-cyan-400  text-white rounded-lg  tracking-wider hover:bg-cyan-500 outline-none">
                    الإنتقال
                  </Link>
                </div>
                
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
