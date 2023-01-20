"use client";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import todo_img from "public/assets/todo_img.png";
import axios from "axios";
import UpdateTask from "./UpdateTask";

export default function Todo() {
  const { tokens, refresh } = useContext(AuthContext);
  const [flagForm, setFlagForm] = useState(false);
  const [moduleFlag, setModuleFlag] = useState(false);
  const [taskInfo, setTaskInfo] = useState([]);
  const [data, setData] = useState([]);
  const refresh_string = localStorage.getItem("refresh");
  refresh(refresh_string);
  const access = localStorage.getItem("access");
  const config = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
  };

  const url = `https://dhiker-api-v1.herokuapp.com/api/v1/todo/`;

  useEffect(() => {
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
    e.preventDefault();
    setFlagForm(false);
    const obj = {
      owner: localStorage.getItem("userId"),
      date:e.target.date.value,
      time:e.target.time.value,
      task:e.target.task.value,
      description:e.target.description.value,
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
    <>
      <div className="flex w-full bg-gray-200 shadow-2xl h-80 right">
        <Image src={todo_img} alt="todo" className="w-4/6 h-full" />
        <div className="w-2/6 pb-16 mr-1 text-3xl text-right text-gray-700">
         
          <div className="border-b-2 border-teal-600 ">
             <h1 className="py-4 text-center"> <span className="text-teal-600">{localStorage.getItem("username")} </span>أهلا بك </h1></div>
            <h2 className="p-4 text-teal-800 "> يأتي الشعور بالإنجاز عندما تكمل مهام الأهداف التي حددتها لنفسك لذا ابدأ معنا ببناء قائمة المهام خاصتك</h2>
          {!flagForm &&
          <div className="p-2 text-left">
              <button
                className="px-8 py-3 text-2xl font-bold text-white bg-teal-600 shadow-2xl rounded-3xl hover:bg-teal-800 shadow-gray-500"
                onClick={handleFlag}
              >
                اضف مهمة
              </button>
            </div> }
          
        </div>
        
      </div>
      {tokens ? (
        <div className="font-sans text-xl ">
          {!flagForm ? (
            <div className="p-10 text-right">
            </div>
          ) : (
            <div className="flex justify-center px-8 py-8 bg-white border-solid ">
              <div className="p-8 bg-white border-solid shadow-2xl md:w-1/4 lg:w-1/2 shadow-gray-300 rounded-3xl">
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
                    <button className="px-8 py-3 font-bold text-white bg-teal-600 shadow-2xl rounded-3xl hover:bg-teal-800">
                      إضافة
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div>
            {data && data.length > 0 ? (
              <div className="flex  item-right">
                <div className="grid w-full grid-cols-1 gap-6 text-3xl sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {data.length > 0 &&
                    data.map((task) => {
                      return (
                        <div
                          className="float-right max-w-xl px-8 py-8 my-20 "
                          key={task.id}
                        >
                          <div className="mb-6 tracking-wide bg-gray-100 rounded-lg shadow-2xl">
                            <div className="flex justify-center py-2 text-teal-700 bg-teal-200 border-b-4 border-gray-300 rounded-lg md:flex-shrink-0">
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
                                    className="inline-flex items-center justify-center w-8 h-8 mr-2 text-white bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
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
                                  <h1 className="-ml-3 text-xl text-2xl text-right text-teal-700 text-blue-600 text-bold">
                                    {task.task}
                                  </h1>
                                  <h5 className="-ml-3 text-xl text-right text-teal-500 text-blue-500 text-s">
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
    </>
  );
}
