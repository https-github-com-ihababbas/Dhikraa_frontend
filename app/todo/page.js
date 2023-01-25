"use client";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import todo_img from "public/assets/todo_img.png";
import axios from "axios";
import UpdateTask from "./UpdateTask";
import style from "../styles/todo.module.css"
import image from "public/assets/image.png";
import todo from "public/assets/todo.png";
import { Icon } from '@iconify/react';
import home_img from 'public/assets/back2.png';

import line_img from "public/assets/line.png";
import zakaref from "public/assets/back44.png";


export default function Todo() {
  const { tokens, refresh } = useContext(AuthContext);
  const [flagForm, setFlagForm] = useState(false);
  const [moduleFlag, setModuleFlag] = useState(false);
  const [taskInfo, setTaskInfo] = useState([]);
  const [data, setData] = useState([]);
  
  const [refreshString, setRefreshString] = useState(null)
  const [accessString, setAccessString] = useState(null)
  const [userid, setId] = useState(null)

  
  const url = `https://dhiker-api-v1.herokuapp.com/api/v1/todo/`;

  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)

    const access = localStorage.getItem("access");
    setAccessString(access)
    
    const id = localStorage.getItem("userId")
    setId(id)


    refresh(refresh_string);
    const config = {
      headers: {
        Authorization: `Bearer ${access}`,
      },
    };

    axios
      .get(url, config)
      .then((result) => {
        setData(result.data);

      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFlag = () => {
    setFlagForm(true);
  };

  const handleSubmit = (e) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    };
    e.preventDefault();
    setFlagForm(false);
    const obj = {
      owner: userid,
      date: e.target.date.value,
      time: e.target.time.value,
      task: e.target.task.value,
      description: e.target.description.value,
    };
    console.log(obj);
    axios
      .post(url, obj, config)
      .then((result) => {
        const card = {
          key: result.data.id,
          date: result.data.date,
          time: result.data.time,
          task: result.data.task,
          description: result.data.description,
        };
        axios
          .get(url, config)
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("postSide", err);
      });
  };

  const deleteTask = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    };
    
    console.log(`${url}${id}`);
    axios
      .delete(`${url}${id}`, config)
      .then((res) => {
        axios
          .get(url, config)
          .then((result) => {
            setData(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch(function (err) {
        console.log("deleteSide", err);
      });
  };

  const openModule = (item) => {
    setModuleFlag(true);
    setTaskInfo(item);
  };

  const closeModule = () => {
    setModuleFlag(false);
  };

  const closeForm = () => {
    setFlagForm(false);
  };

  function toConvert(time) {
    time = time
      .toString()
      .match(/^([01]\d|2[0-3])(:)([0-5]\d)(:[0-5]\d)?$/) || [time];

    if (time.length > 1) {
      time = time.slice(1);
      time.pop();
      time[5] = +time[0] < 12 ? "AM" : "PM";
      time[0] = +time[0] % 12 || 12;
    }
    return time.join("");
  }

  return (
    <section className="bg-[#e5f2c4]">
      {/* <Image src={home_img} alt="Picture of the author" className={style.image} /> */}
      <section className="flex justify-between">

        <section className="pt-6 ">
          <div className="flex justify-end">

            <div className="text-5xl mr-[35%]  text-[#252f0b]   ">

              <h1 className="pl-14">
                اَلْمَهَامُّ
              </h1>
              <Image className="justify-center" width={200} src={line_img} />
            </div>
          </div>

          <div className="flex justify-between py-4 mb-8 ml-40 mr-20 rounded-md shadow-sm flex-right">

            <div className="relative justify-center w-1/4 h-52 ">
              <div
                className="absolute inset-0 bg-gradient-to-r from-[#949e7b] to-[#778554] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
              </div>
              <div className="relative shadow-lg sm:rounded-3xl sm:p-1 ">
                <Image className="w-full h-52 rounded-3xl rad" src={todo} />
              </div>
            </div>
            <div className="w-3/4">
              <h1 className="mt-10 text-4xl justify-self-center text-right text-[#252f0b] dark:text-white" ></h1>
              <br />



              <p className="text-2xl text-[#252f0b]  text-right ml-36  flex justify-between">
                يَأْتِي اَلشُّعُورُ بِالْإِنْجَازِ عِنْدَمَا تُكْمِلُ مَهَامَّ اَلْأَهْدَافِ اَلَّتِي حَدَّدَتْهَا لِنَفْسِكَ لِذَا اِبْدَأْ مَعَنَا بِبِنَاءِ قَائِمَةِ اَلْمَهَامِّ خَاصَّتُكَ
                <Icon icon="iconoir:system-restart" className="mx-4" />

              </p>
              {/* <br />
            <p className="text-2xl text-[#252f0b] ml-32 mr-32 flex justify-end ">
              اِحْرِصْ عَلَى تَجْدِيدِ نِيَّتِكَ دَائِمًا
              <Icon icon="iconoir:system-restart" className="mx-4" />
            </p> */}



            </div>
          </div>
        </section>
        <Image className="justify-center h-52 w-52" src={zakaref} />

      </section>


      <div >

        {tokens ? (
          <div className="font-sans text-xl ">
            <div
              className="flex justify-center pt-6">
              <button onClick={handleFlag} type="button" className=" mr-25 py-2 px-3 flex text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                <div className="text-xl font-mono font-bold pt-0.5 px-3">
                  اضف مهمة
                </div>
                <span className="px-2 py-4 font-mono text-2xl text-gray-100 border-l-2 border-gray-100">
                </span>
              </button>


            </div>

            {!flagForm ? (
              <div className="text-right ">
              </div>
            ) : (
              <div className="flex justify-center px-8 py-4 border-solid ">
                <div className="p-6 bg-[white] border-solid shadow-2xl md:w-1/12 lg:w-1/3 shadow-gray-300 rounded-3xl">
                  <button
                    onClick={closeForm}
                    className="float-left border-2 border-gray-400 border-solid rounded hover:border-3 hover:border-gray-700"
                  >
                    ❌
                  </button>
                  <form action="" onSubmit={handleSubmit}>
                    <div className="flex items-center mb-5">
                      <input
                        type="text"
                        id="task"
                        name="task"
                        required
                        className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 outline-none focus:border-green-400"
                      />
                      <label
                        className="inline-block w-20 mr-6 font-bold text-right text-gray-600 "
                      >
                        المهمة
                      </label>
                    </div>

                    <div className="flex items-center mb-10">
                      <input
                        type="text"
                        id="description"
                        name="description"
                        required
                        className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                      />
                      <label
                        className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                      >
                        الوصف
                      </label>
                    </div>

                    <div className="flex items-center mb-10">
                      <input
                        type="date"
                        id="date"
                        name="date"
                        min="2023-01-01"
                        max="2050-12-31"
                        required
                        className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                      />
                      <label
                        className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                      >
                        التاريخ
                      </label>
                    </div>

                    <div className="flex items-center mb-10">
                      <input
                        type="time"
                        id="time"
                        name="time"
                        min="00:00:00"
                        max="23:59:59"
                        required
                        className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400"
                      />
                      <label
                        className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                      >
                        الوقت
                      </label>
                    </div>

                    <div className="text-left">
                      <button className="px-8 py-2 font-bold text-white shadow-2xl bg-[#3a451c] rounded-3xl hover:bg-[#778554]">
                        إضافة
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            )}
            <div>
              {data && data.length > 0 ? (
                <div className="flex item-right">
                  <div className="grid w-full grid-cols-1 gap-6 text-xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {data.length > 0 &&
                      data.map((task) => {
                        return (
                          <div
                            className="float-right max-w-xl px-8 py-8 my-7 "
                            key={task.id}
                          >
                            <div className="mb-6 tracking-wide bg-gray-100 rounded-lg shadow-2xl">
                              <div className="flex justify-center py-2 text-[#e5f2c4] bg-[#3a451c] border-b-4 border-gray-300 rounded-lg md:flex-shrink-0">
                                {task.date}
                              </div>
                              <div>
                                <div className="px-4 py-2 mt-2 border-b-4 border-gray-300 ">
                                  <p className="pb-16 mr-1 text-xl text-right text-gray-700">
                                    {task.description}{" "}
                                  </p>
                                </div>
                                <div className="flex justify-between mx-6 mt-2">
                                  <div className="flex justify-between mt-2">
                                    <button
                                      onClick={() => openModule(task)}
                                      className="inline-flex items-center justify-center w-8 h-8 mr-2 text-white bg-teal-600 rounded-lg focus:shadow-outline hover:bg-teal-800 "
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                                        />
                                      </svg>
                                    </button>
                                    <button
                                      className="inline-flex items-center justify-center w-8 h-8 mr-4 text-white bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                                      onClick={() => deleteTask(task.id)}
                                    >
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-5 h-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth="2"
                                          d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                                        />
                                      </svg>
                                    </button>
                                  </div>
                                  <div>
                                    <h1 className="-ml-3 text-xl text-right text-teal-700 text-[#778554] text-bold">
                                      {task.task}
                                    </h1>
                                    <h5 className="-ml-3 text-lg text-right text-teal-500 text-[#778554] text-s">
                                      {toConvert(task.time)}
                                    </h5>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </div>
                </div>
              ) : (
                <div className="flex items-center pb-20 mb-4"></div>
              )}
            </div>
          </div>
        ) : (
          <div className="my-16 text-3xl text-center ">
            سارع التسجيل في الموقع لاستخدام هذة الميزة
          </div>
        )}
        <UpdateTask
          isOpen={moduleFlag}
          close={closeModule}
          taskInfo={taskInfo}
          setData={setData}
        />
      </div>
      <section className="flex justify-start">
        <Image className="justify-center rotate-180 h-52 w-52" width={300} src={zakaref} />

      </section>




    </section>
  );
}
