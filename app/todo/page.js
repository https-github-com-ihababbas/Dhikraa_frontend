"use client";
import React from "react";
import { useState, useContext } from "react";
import { AuthContext } from "../contexts/auth";

export default function Todo() {

  const { tokens } = useContext(AuthContext);
  const [flagForm, setFlagForm] = useState(false);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [cardInfo,setCardInfo]=useState([])

  const handleFlag = () => {
    setFlagForm(true);
  };
  const [key,setKey]=useState(1)

  const handleTaskChange=(e)=>{
    setTask(e.target.value);
  }

  const handleDesChange=(e)=>{
  setDescription(e.target.value);
  }

  const handleDateChange=(e)=>{
    setDate(e.target.value);
  }

  const handleTimeChange=(e)=>{
    setTime(e.target.value);
  }

  
  const handleSubmit = (e) => {
    e.preventDefault();
    setFlagForm(false);
    setKey(key+1)
   const card={
      date,
      time,
      description,
      task,
      key,
    }

    console.log('before',cardInfo)
    setCardInfo([...cardInfo, card])
    
  };
  
  console.log('after',cardInfo)
  return (
    <>
      {tokens ? (
        <div className="bg-white">
          {!flagForm ? (
            <div className="text-left p-10">
              <button
                className="py-3 px-8 bg-green-400 text-white font-bold rounded-3xl shadow-3xl hover:bg-green-600"
                onClick={handleFlag}
              >
                Add A new Task
              </button>
            </div>
          ) : (
            <div className="bg-white py-8 px-8  border-solid flex justify-center">
              <div className="bg-white p-8 md:w-1/4 lg:w-1/2 border-solid shadow-2xl rounded-3xl">
                <form action="" onSubmit={handleSubmit}>
                  <div className="flex items-center mb-5">
                    <label
                      className="inline-block w-20 mr-6 text-right 
                                 font-bold text-gray-600"
                    >
                      Task
                    </label>
                    <input
                      type="text"
                      id="task"
                      name="task"
                      required
                      className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600
                      outline-none"
                      onChange={handleTaskChange}
                    />
                  </div>

                  <div className="flex items-center mb-10">
                    <label
                      className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-600"
                    >
                      Description
                    </label>
                    <input
                      type="text"
                      id="description"
                      name="description"
                      required
                      className="flex-1 py-2 border-b-2 border-gray-400  
                      text-gray-600"
                      onChange={handleDesChange}
                    />
                  </div>

                  <div className="flex items-center mb-10">
                    <label
                      className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-600"
                    >
                      Date
                    </label>
                    <input
                      type="date"
                      id="date"
                      name="date"
                      min="2023-01-01"
                      max="2050-12-31"
                      required
                      className="flex-1 py-2 border-b-2 border-gray-400  
                      text-gray-600
                      "
                      onChange={handleDateChange}
                    />
                  </div>

                  <div className="flex items-center mb-10">
                    <label
                      className="inline-block w-20 mr-6 text-right
                                    font-bold text-gray-600"
                    >
                      Time
                    </label>
                    <input
                      type="time"
                      id="time"
                      name="time"
                      min="00:00:00"
                      max="23:59:59"
                      required
                      className="flex-1 py-2 border-b-2 border-gray-400  
                      text-gray-600
                      "
                      onChange={handleTimeChange}
                    />
                  </div>

                  <div className="text-right">
                    <button className="py-3 px-8 bg-green-400 text-white font-bold rounded-3xl hover:bg-green-600 shadow-2xl">
                      Add Task
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
            {cardInfo.length>0 && cardInfo.map((task) =>{
              return (
              <div className="px-8 py-8 max-w-xl my-20 " key={task.key}>
              <div className="bg-gray-100 shadow-2xl rounded-lg mb-6 tracking-wide">
                <div className="md:flex-shrink-0 py-2 border-b-4 border-gray-300 flex justify-center">
                  {task.date}
                </div>
                <div>
                  <div className=" px-4 py-2 mt-2 border-b-4 border-gray-300">
                    <p className="text-xl text-gray-700 mr-1 pb-16">{task.description} </p>
                  </div>
                  <div className="flex justify-between mt-2 mx-6">
                    <div>
                      <h2 className="text-blue-500 text-xl -ml-3 ">{task.task} {task.key}</h2>
                      <h3 className="text-blue-500 text-s -ml-3 ">{task.time}</h3>
                    </div>
                    <div className="flex justify-between mt-2">
                      <button className="inline-flex items-center justify-center w-8 h-8 mr-2 text-white  bg-red-600 rounded-lg focus:shadow-outline hover:bg-red-800">
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
                      <button className="inline-flex items-center justify-center w-8 h-8 mr-2 text-white  bg-green-600 rounded-lg focus:shadow-outline hover:bg-green-800">
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
                    </div>
                  </div>
                </div>
              </div>
            </div>

            )})}

          </div>
        </div>
      ) : (
        <h1 className="text-black">You dont have access for this feature</h1>
      )}
    </>
  );
}
