import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";

export default function UpdateTask({ isOpen, close, taskInfo,setData }) {
  const { tokens, refresh } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const refresh_string = localStorage.getItem("refresh");
  refresh(refresh_string);
  const access = localStorage.getItem("access");
  const config = {
    headers: {
      Authorization: `Bearer ${access}`,
    },
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
    const url = `https://dhiker-api-v1.herokuapp.com/api/v1/todo/`;
    const obj = {
      owner: localStorage.getItem("userId"),
      date,
      time,
      task,
      description,
      id: taskInfo.id,
    };
    axios
      .put(`${url}${taskInfo.id}`, obj, config)
      .then((result) => {
        console.log(result.data);

        axios
      .get(url, config)
      .then((result) => {
        setData(result.data)
      })
      .catch((err) => {
        console.log(err);
      });
      })
      .catch((err) => {
        console.log("updateSide", err);
      });
    close();
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setOpen}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto text-xl">
            <div className="flex min-h-full items-end justify-center text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 "
                enterTo="opacity-100 translate-y-0 "
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 "
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 "
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                    <div className="bg-white p-8  w-full border-solid shadow-2xl rounded-3xl">
                      <button
                        onClick={close}
                        className="border-solid border-2 border-gray-400 rounded float-left  hover:border-3 hover:border-gray-700"
                      >
                        ❌
                      </button>
                      <form action="" onSubmit={handleSubmit}>
                        <div className="flex items-center mb-5 ">
                          <input
                            type="text"
                            id="task"
                            name="task"
                            required
                            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 
                      text-gray-600
                      outline-none text-right"
                            onChange={handleTaskChange}
                            defaultValue={taskInfo.task}
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
                            defaultValue={taskInfo.description}
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
                            defaultValue={taskInfo.date}
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
                            defaultValue={taskInfo.time}
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
                            تعديل
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  );
}
