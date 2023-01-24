"use client";
import React from "react";
import Link from "next/link";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "app/contexts/auth.js";
import axios from "axios";
import AddQus from "./AddQus";
import UpdateQus from "./UpdateQus";
import style from "app/styles/admin.module.css"
import LoginForm from "../../login/page";

export default function Quizzes() {
  const { tokens, refresh } = useContext(AuthContext);
  const refresh_string = localStorage.getItem("refresh");
  refresh(refresh_string);
  const access = localStorage.getItem("access");
  const config = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };
  const [allQuizzes, setAllQuizzes] = useState([]);
  const [someOfQ, setSomeOfQ] = useState([]);
  const [moduleFlag, setModuleFlag] = useState(false);
  const [moduleUpdateFlag, setModuleUpdateFlag] = useState(false);
  const [quizType, setQuizType] = useState([]);
  const [quizInfo, setQuizInfo] = useState([]);

  const types = {
    General: "أسئلة عامة",
    Quran: "أسئلة في القرآن الكريم",
    Tajweed: "أسئلة في التجويد",
    Ciera: "أسئلة في السيرة النبوية",
  };
  const url = `https://dhiker-api-v1.herokuapp.com/api/v1/quiz/`;
  useEffect(() => {
    axios
      .get(url, config)
      .then((result) => {
        setAllQuizzes(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const showQuestions = (qType) => {
    const x = allQuizzes.filter((item) => {
      return item.type == qType;
    });
    setSomeOfQ(x);
  };

  const openModule = (item) => {
    setModuleFlag(true);
    setQuizType(item);
  };

  const closeModule = () => {
    setModuleFlag(false);
  };

  const openUpdateModule = (item) => {
    setModuleUpdateFlag(true);
    setQuizInfo(item);
  };

  const closeUpdateModule = () => {
    setModuleUpdateFlag(false);
  };

  const deleteQue = (id) => {
    console.log(`${url}${id}`);
    axios
      .delete(`${url}${id}`, config)
      .then((res) => {
        axios
          .get(url, config)
          .then((result) => {
            setSomeOfQ(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log("deleteSide", err);
      });
  };
  const admin=localStorage.getItem("username")
  return (
    <>
    {tokens && admin=="admin" ?<div className={`${style.back} py-10`}>
      <Link href='/admin' className="flex w-[14%] px-8 py-2  ml-8 text-lg text-black shadow-2xl rounded-3xl hover:text-[#e5f2c4] hover:bg-[#3a451c] shadow-gray-500 text-center bg-[#949e7b]"> عودة لصفحة الرئيسية</Link>
      <div className=" justify-center px-6 md:flex w-full gap-8 pt-10 ">
        {someOfQ.length > 0 &&
        <div className={`h-screen shadow-md   overflow-scroll ${style.tbody} w-1/2 dark:bg-gray-900 bg-[#e5f2c4]`}>
          {someOfQ.length > 0 ? (
            someOfQ.map((item) => {
              return (
                <div
                  className="flex flex-col border rounded-lg  bg-[#949e7b] mb-4 shadow-xl w-full"
                  key={item.id}
                >
                  <div className="grid grid-cols-1 ">
                    <div className="flex flex-col ">
                      <div className="flex flex-col p-4 text-[#252f0b] flex items-center  ">
                        <div className="flex flex-row text-2xl mt-2 text-center ">
                          {item.question}
                        </div>
                      </div>
                      <div className="flex flex-col w-full pb-2">
                        <div className=" text-gray-500 dark:bg-transparent w-full items-center flex justify-center gap-20 bg-[#949e7b]">
                          <button onClick={() => openUpdateModule(item)} className=" cursor-pointer uppercase text-lg flex flex-row items-center  justify-center font-semibold  w-1/4 mt-2 text-lg text-[#252f0b] bg-[#e5f2c4] shadow-2xl rounded-3xl hover:bg-[#778554]  py-2 mb-2 ">
                            <div className="mr-2 items-center justify-center">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 0 24 24"
                                width="20px"
                                fill="#252f0b"
                                
                              >
                                <path d="M0 0h24v24H0z" fill="none" />
                                <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
                              </svg>
                            </div>
                            تعديل
                          </button>
                          <button
                            className="cursor-pointer uppercase text-lg flex flex-row items-center  justify-center font-semibold  w-1/4 mt-2 text-lg text-[#252f0b] bg-[#778554]  shadow-2xl rounded-3xl hover:bg-[#e5f2c4] py-2 mb-2"
                            onClick={() => deleteQue(item.id)}
                          >
                            <div className="mr-2">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                height="20px"
                                viewBox="0 0 24 24"
                                width="20px"
                                fill="#252f0b"
                              >
                                <path d="M0 0h24v24H0V0z" fill="none" />
                                <path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM8 9h8v10H8V9zm7.5-5l-1-1h-5l-1 1H5v2h14V4z" />
                              </svg>
                            </div>
                            إزالة
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="dark:bg-gray-900 bg-teal-200"></div>
          )}
        </div> }
        
        <div className="rounded-lg w-1/2">
          <div className="justify-between mb-6 rounded-lg bg-[#949e7b] p-6 shadow-2xl sm:flex sm:justify-start hover:scale-105">
            <div className="sm:ml-4 sm:flex w-full sm:justify-between ">
              <button
                onClick={() => {
                  showQuestions("General");
                }}
                className="flex items-center space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#e5f2c4] shadow-2xl rounded-3xl hover:bg-[#778554] hover:text-[#e5f2c4]  shadow-gray-500 w-1/6"
              >
                عرض
              </button>
              <button
                onClick={() => openModule("General")}
                className="flex items-center w-1/6 space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#778554] shadow-2xl rounded-3xl hover:bg-[#e5f2c4]  shadow-gray-500"
              >
                إضافة
              </button>
              <h2 className="text-2xl font-bold text-[#252f0b] text-right w-1/2">
                {types.General}
              </h2>
            </div>
          </div>
          <div className="justify-between mb-6 rounded-lg bg-[#949e7b] p-6 shadow-2xl sm:flex sm:justify-start hover:scale-105">
            <div className="sm:ml-4 sm:flex w-full sm:justify-between">
              <button
                onClick={() => {
                  showQuestions("Quran");
                }}
                className="flex items-center space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#e5f2c4] shadow-2xl rounded-3xl hover:bg-[#778554] hover:text-[#e5f2c4]  shadow-gray-500 w-1/6"
              >
                عرض
              </button>
              <button
                onClick={() => openModule("Quran")}
                className="flex items-center w-1/6 space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#778554] shadow-2xl rounded-3xl hover:bg-[#e5f2c4]  shadow-gray-500"
              >
                إضافة
              </button>
              <h2 className="text-2xl font-bold text-[#252f0b] text-right w-1/2">
                {types.Quran}
              </h2>
            </div>
          </div>
          <div className="justify-between mb-6 rounded-lg bg-[#949e7b] p-6 shadow-2xl sm:flex sm:justify-start hover:scale-105">
          <div className="sm:ml-4 sm:flex w-full sm:justify-between">
              <button
                onClick={() => {
                  showQuestions("Tajweed");
                }}
                className="flex items-center space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#e5f2c4] shadow-2xl rounded-3xl hover:bg-[#778554] hover:text-[#e5f2c4]  shadow-gray-500 w-1/6"
              >
                عرض
              </button>
              <button
                onClick={() => openModule("Tajweed")}
                className="flex items-center w-1/6 space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#778554] shadow-2xl rounded-3xl hover:bg-[#e5f2c4]  shadow-gray-500"
              >
                إضافة
              </button>
              <h2 className="text-2xl font-bold text-[#252f0b] text-right w-1/2">
                {types.Tajweed}
              </h2>
            </div>
          </div>
          <div className="justify-between mb-6 rounded-lg bg-[#949e7b] p-6 shadow-2xl sm:flex sm:justify-start hover:scale-105">
          <div className="sm:ml-4 sm:flex w-full sm:justify-between">
              <button
                onClick={() => {
                  showQuestions("Ciera");
                }}
                className="flex items-center space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#e5f2c4] shadow-2xl rounded-3xl hover:bg-[#778554] hover:text-[#e5f2c4]  shadow-gray-500 w-1/6"
              >
                عرض
              </button>
              <button
                onClick={() => openModule("Ciera")}
                className="flex items-center w-1/6 space-x-4 px-8 py-2 text-lg text-[#252f0b] bg-[#778554] shadow-2xl rounded-3xl hover:bg-[#e5f2c4]  shadow-gray-500"
              >
                إضافة
              </button>
              <h2 className="text-2xl font-bold text-[#252f0b] text-right w-1/2">
                {types.Ciera}
              </h2>
            </div>
          </div>
        </div>
      </div>
      <AddQus
        isOpen={moduleFlag}
        close={closeModule}
        setAllQuizzes={setAllQuizzes}
        quizType={quizType}
      />
      <UpdateQus
      isOpen={moduleUpdateFlag}
      close={closeUpdateModule}
      setAllQuizzes={setAllQuizzes}
      quizInfo={quizInfo}
      />
    </div> 
    :<LoginForm/>
    }
    </>
  );
}
