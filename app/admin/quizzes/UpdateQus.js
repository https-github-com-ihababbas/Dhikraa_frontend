import { Fragment, useRef, useState, useContext,useEffect } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "app/contexts/auth.js";
import axios from "axios";

export default function UpdateQus({ isOpen, close, quizInfo, setAllQuizzes }) {
  const { tokens, refresh } = useContext(AuthContext);
  const [open, setOpen] = useState(true);
  const cancelButtonRef = useRef(null);
  const [refreshString, setRefreshString] = useState(null)
  const [accessString, setAccessString] = useState(null)
  const [userId, setUserId] = useState(null)

  useEffect(() => {
    const refresh_string = localStorage.getItem("refresh");
    setRefreshString(refresh_string)

    const access = localStorage.getItem("access");
    setAccessString(access)
    const admin = localStorage.getItem("userId")
    setUserId(admin)


   
   

  }, [])


 

  const handleSubmit = (e) => {
    e.preventDefault();
    const url = `https://dhiker-api-v1.herokuapp.com/api/v1/quiz/`;
    const correct = e.target.correct.value;
    const wrong1 = e.target.wrong1.value;
    const wrong2 = e.target.wrong2.value;
    const wrong3 = e.target.wrong3.value;
    const obj = {
      owner: userId,
      question: e.target.question.value,
      choices: JSON.stringify({
        correct: correct,
        wrong1: wrong1,
        wrong2: wrong2,
        wrong3: wrong3,
      }),
      type: quizInfo.type,
      id: quizInfo.id,
    };
    
    refresh(refreshString);
    const config = {
      headers: {
        Authorization: `Bearer ${accessString}`,
      },
    };

    axios
      .put(`${url}${quizInfo.id}`, obj, config)
      .then((result) => {
        console.log(result.data);
        axios
          .get(url, config)
          .then((result) => {
            setAllQuizzes(result.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log("postSide", err);
      });
    close();
  };

  return (
    <>
      <Transition.Root show={isOpen} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10 bg-[#e5f2c4] "
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
            <div className="fixed inset-0 bg-[#e5f2c4]  bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto text-xl ">
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
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg text-left bg-[#949e7b]  shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-[#949e7b]  px-4 pt-5 pb-4 sm:p-6 sm:pb-4 ">
                    <button
                      onClick={close}
                      className="float-left mb-16 border-2 border-gray-400 border-solid rounded hover:border-3 hover:border-gray-700"
                    >
                      ???
                    </button>
                    <div className="bg-[#949e7b]  p-8  w-full border-solid  rounded-3xl">
                      <form action="" onSubmit={handleSubmit}>
                        <div className="flex items-center mb-5 ">
                          <input
                            type="text"
                            id="question"
                            name="question"
                            defaultValue={quizInfo.question}
                            required
                            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 bg-[#e5f2c4] text-[#252f0b] outline-none text-right "
                          />
                          <label
                            className="inline-block w-20 mr-6 text-right 
                                 font-bold text-[#252f0b] w-1/2"
                          >
                            ????????????
                          </label>
                        </div>

                        <div className="flex items-center mb-10">
                          <input
                            type="text"
                            id="correct"
                            name="correct"
                            defaultValue={
                              typeof quizInfo.choices == "string"
                                ? JSON.parse(quizInfo.choices)["correct"]
                                : typeof quizInfo.choices == "object"
                                ? quizInfo.choices["correct"]
                                : "????????"
                            }
                            required
                            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 bg-[#e5f2c4] 
                      text-[#252f0b]
                      outline-none text-right"
                          />
                          <label
                            className="inline-block w-20 mr-6 text-right 
                                 font-bold text-[#252f0b] w-1/2"
                          >
                            ?????????????? ??????????????
                          </label>
                        </div>
                        <div className="flex items-center mb-10">
                          <input
                            type="text"
                            id="wrong1"
                            name="wrong1"
                            defaultValue={
                              typeof quizInfo.choices == "string"
                                ? JSON.parse(quizInfo.choices)["wrong1"]
                                : typeof quizInfo.choices == "object"
                                ? quizInfo.choices["wrong1"]
                                : "??????1"
                            }
                            required
                            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 bg-[#e5f2c4] 
                      text-[#252f0b]
                      outline-none text-right"
                          />
                          <label
                            className="inline-block w-20 mr-6 text-right 
                                 font-bold text-[#252f0b] w-1/2"
                          >
                            ???????????? ???????????? ??????????
                          </label>
                        </div>
                        <div className="flex items-center mb-10">
                          <input
                            type="text"
                            id="wrong2"
                            name="wrong2"
                            required
                            defaultValue={
                              typeof quizInfo.choices == "string"
                                ? JSON.parse(quizInfo.choices)["wrong2"]
                                : typeof quizInfo.choices == "object"
                                ? quizInfo.choices["wrong2"]
                                : "??????2"
                            }
                            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 bg-[#e5f2c4] 
                      text-[#252f0b]
                      outline-none text-right"
                          />
                          <label
                            className="inline-block w-20 mr-6 text-right 
                                 font-bold text-[#252f0b] w-1/2"
                          >
                            ???????????? ???????????? ????????????
                          </label>
                        </div>
                        <div className="flex items-center mb-10">
                          <input
                            type="text"
                            id="wrong3"
                            name="wrong3"
                            required
                            defaultValue={
                              typeof quizInfo.choices == "string"
                                ? JSON.parse(quizInfo.choices)["wrong3"]
                                : typeof quizInfo.choices == "object"
                                ? quizInfo.choices["wrong3"]
                                : "??????3"
                            }
                            className="flex-1 py-2 border-b-2 border-gray-400 focus:border-green-400 bg-[#e5f2c4] 
                      text-[#252f0b]
                      outline-none text-right"
                          />
                          <label
                            className="inline-block w-20 mr-6 text-right 
                                 font-bold text-[#252f0b] w-1/2"
                          >
                            ???????????? ???????????? ????????????
                          </label>
                        </div>
                        <div className="text-left">
                          <button className="px-8 py-3 font-bold text-white bg-teal-800 shadow-2xl rounded-3xl hover:bg-teal-600">
                            ??????????
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
