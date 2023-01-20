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
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
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
        console.log("useeffectpart", result.data);
        setData(result.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleFlag = () => {
    setFlagForm(true);
  };

  const handleTaskChange = (e) => {
    setTask(e.target.value);
  };

  const handleDesChange = (e) => {
    setDescription(e.target.value);
  };

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTimeChange = (e) => {
    setTime(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFlagForm(false);
    const obj = {
      owner: localStorage.getItem("userId"),
      date,
      time,
      task,
      description,
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
      <div className="h-80 w-full flex flex right bg-gray-200 shadow-2xl">
        <Image src={todo_img} alt="todo" className="w-4/6 h-full" />
        <div className="text-3xl text-gray-700 mr-1 pb-16 text-right w-2/6">
         
          <div className="border-b-2 border-teal-600 ">
             <h1 className="py-4 text-center"> <span className="text-teal-600">{localStorage.getItem("username")} </span>أهلا بك </h1></div>
            <h2 className="p-4 text-teal-800 "> يأتي الشعور بالإنجاز عندما تكمل مهام الأهداف التي حددتها لنفسك لذا ابدأ معنا ببناء قائمة المهام خاصتك</h2>
          {!flagForm &&
          <div className="text-left p-2">
              <button
                className="py-3 px-8 bg-teal-600 text-white font-bold text-2xl rounded-3xl shadow-2xl hover:bg-teal-800 shadow-gray-500"
                onClick={handleFlag}
              >
                اضف مهمة
              </button>
            </div> }
          
        </div>
        
      </div>
      {tokens ? (
        <div className=" font-sans text-xl">
          {!flagForm ? (
            <div className="text-right p-10">
            </div>
          ) : (
            <div className="bg-white py-8 px-8  border-solid flex justify-center ">
              <div className="bg-white p-8 md:w-1/4 lg:w-1/2 border-solid shadow-2xl  shadow-gray-300 rounded-3xl">
                <button
                  onClick={closeForm}
                  className="border-solid border-2 border-gray-400 rounded float-left  hover:border-3 hover:border-gray-700"
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
                      className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600
                      outline-none text-right"
                      onChange={handleTaskChange}
                    />
                    <label
                      className="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600 "
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
                      className="flex-1 py-2 border-b-2 border-gray-400  
                      text-gray-600 text-right "
                      onChange={handleDesChange}
                    />
                    <label
                      className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-600"
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
                      className="flex-1 py-2 border-b-2 border-gray-400  
                      text-gray-600 text-right
                      "
                      onChange={handleDateChange}
                    />
                    <label
                      className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-600"
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
                      className="flex-1 py-2 border-b-2 border-gray-400  
                      text-gray-600 text-right"
                      onChange={handleTimeChange}
                    />
                    <label
                      className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-600"
                    >
                      الوقت
                    </label>
                  </div>

                  <div className="text-left">
                    <button className="py-3 px-8 bg-teal-600 text-white font-bold rounded-3xl hover:bg-teal-800 shadow-2xl">
                      إضافة
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          <div>
            {data && data.length > 0 ? (
              <div className=" flex item-right ">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full text-3xl">
                  {data.length > 0 &&
                    data.map((task) => {
                      return (
                        <div
                          className="px-8 py-8 max-w-xl my-20 float-right "
                          key={task.id}
                        >
                          <div className="bg-gray-100 shadow-2xl rounded-lg mb-6 tracking-wide">
                            <div className="md:flex-shrink-0 py-2 border-b-4 border-gray-300 flex justify-center text-teal-700 bg-teal-200 rounded-lg">
                              {task.date}
                            </div>
                            <div>
                              <div className=" px-4 py-2 mt-2 border-b-4 border-gray-300">
                                <p className="text-xl text-gray-700 mr-1 pb-16 text-right">
                                  {task.description}{" "}
                                </p>
                              </div>
                              <div className="flex justify-between mt-2 mx-6">
                                <div className="flex justify-between mt-2">
                                  <button
                                    onClick={() => openModule(task)}
                                    className="inline-flex items-center justify-center w-8 h-8 mr-2 text-white  bg-teal-600 rounded-lg focus:shadow-outline hover:bg-teal-800 "
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-6 w-6"
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
                                    className="inline-flex items-center justify-center w-8 h-8 mr-2 text-white  bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800"
                                    onClick={() => deleteTask(task.id)}
                                  >
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      className="h-5 w-5"
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
                                  <h1 className="text-blue-600 text-xl -ml-3 text-right text-2xl text-bold text-teal-700">
                                    {task.task}
                                  </h1>
                                  <h5 className="text-blue-500 text-s -ml-3 text-right text-xl text-teal-500">
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
              <div className="pb-20 mb-4 flex items-center"></div>
            )}
          </div>
        </div>
      ) : (
        <div className=" my-16 text-3xl text-center">
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
