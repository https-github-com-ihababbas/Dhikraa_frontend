"use client";
import React from "react";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../contexts/auth";
import Link from "next/link";
import style from "app/styles/admin.module.css";
import LoginForm from "../login/page";
export default function AdminPanel() {
  const { tokens, refresh } = useContext(AuthContext);

  const [refreshString, setRefreshString] = useState(null)
  const [accessString, setAccessString] = useState(null)
  const [usernameString, setUsername] = useState(null)

  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)

    const access = localStorage.getItem("access");
    setAccessString(access)
    const admin = localStorage.getItem("username")
    setUsername(admin)


    refresh(refresh_string);
    const config = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };

  }, [])




  return (
    <>{tokens && usernameString == 'admin' ? <section class={style.back}>
      <section className="bg-[#e5f2c4] body-font py-32 flex justify-center items-center ">
        <div className="container justify-center h-full pt-16 pb-16 mx-auto ">
          <div className="flex flex-wrap justify-center text-center">
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500 shadow-2xl bg-[#949e7b] mx-8 rounded-2xl ">
              <div className=" bg-[#949e7b] flex items-center  justify-between px-4 h-full  rounded-lg">
                <div className="bg-gradient-to-tr from-[#252f0b] to[#252f0b] w-32 h-32  rounded-full shadow-2xl shadow-[#252f0b] border-white  border-dashed [#e5f2c4]   flex justify-center items-center ">
                  <div>
                    <h1 className="text-2xl text-[#e5f2c4] ">المستخدمون</h1>
                  </div>
                </div>
                <div>
                  <h2 className="text-[#e5f2c4] text-2xl font-bold mb-6">
                    قسم المستخدمون
                  </h2>
                  <Link
                    href="/admin/users"
                    className="text-lg mt-6 px-4 py-2 bg-[#3a451c]  text-[#e5f2c4] rounded-lg  hover:bg-[#e5f2c4] hover:text-[#252f0b] outline-none"
                  >
                    الإنتقال
                  </Link>
                </div>
              </div>
            </div>
            <div className="p-4 sm:w-1/2 lg:w-1/3 w-full hover:scale-105 duration-500 bg-[#778554]  shadow-2xl mx-8 rounded-2xl">
              <div className=" flex items-center   justify-between p-4  rounded-lg bg-[#778554] shadow-[#778554] shadow-md">
                <div className="bg-gradient-to-tr from-[#949e7b] to-[#949e7b] w-32 h-32  rounded-full shadow-2xl shadow-[#949e7b] border-[#949e7b]  border-dashed border-2  flex justify-center items-center ">
                  <div>
                    <h1 className="text-[#e5f2c4] text-2xl text-bold">
                      الإختبارات
                    </h1>
                  </div>
                </div>
                <div>
                  <h2 className="text-[#e5f2c4] text-2xl  mb-6 font-bold">
                    قسم الإختبارات
                  </h2>
                  <Link
                    href="admin/quizzes"
                    className="text-lg mt-6 px-4 py-2 bg-[#3a451c]  text-[#e5f2c4] rounded-lg  hover:bg-[#e5f2c4] hover:text-[#252f0b] outline-none"
                  >
                    الإنتقال
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </section>
      : <LoginForm />}

    </>
  );
}
