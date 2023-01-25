import { Fragment, useRef, useState, useContext ,useEffect} from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";

export default function UpdateTask({ isOpen, close, taskInfo,setData }) {
  const { tokens, refresh } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [refreshString, setRefreshString] = useState(null)
  const [accessString, setAccessString] = useState(null)
  const [userid, setUserId] = useState(null)

  
 

  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)

    const access = localStorage.getItem("access");
    setAccessString(access)
    const id = localStorage.getItem("userId")
    setUserId(id)

  }, [])




  
  const handleSubmit = (e) => {
    refresh(refreshString);
    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    };
    e.preventDefault();
    console.log(e.target.task.value)
    console.log(e.target.description.value)
    console.log(e.target.date.value)
    console.log(e.target.time.value)
    const url = `https://dhiker-api-v1.herokuapp.com/api/v1/todo/`;
    const obj = {
      owner: userid,
      date:e.target.date.value,
      time:e.target.time.value,
      task:e.target.task.value,
      description:e.target.description.value,
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
            <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto text-xl">
            <div className="flex items-end justify-center min-h-full text-center sm:items-center sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 "
                enterTo="opacity-100 translate-y-0 "
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 "
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 "
              >
                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4">
                    <div className="w-full p-8 bg-white border-solid shadow-2xl rounded-3xl">
                      <button
                        onClick={close}
                        className="float-left border-2 border-gray-400 border-solid rounded hover:border-3 hover:border-gray-700"
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
                            className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 outline-none focus:border-green-400"
                            defaultValue={taskInfo.task}
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
                            defaultValue={taskInfo.description}
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
                            defaultValue={taskInfo.date}
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
                            defaultValue={taskInfo.time}
                          />
                          <label
                            className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                          >
                            الوقت
                          </label>
                        </div>

                        <div className="text-left">
                          <button className="px-8 py-3 font-bold text-white bg-teal-600 shadow-2xl rounded-3xl hover:bg-teal-800">
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
