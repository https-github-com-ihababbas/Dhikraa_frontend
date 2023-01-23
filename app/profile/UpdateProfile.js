import { Fragment, useRef, useState, useContext } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { AuthContext } from "../contexts/auth";
import axios from "axios";
import Swal from 'sweetalert2'

export default function UpdateProfile({ isOpen, close, id,setUserData,userData }) {
    const { tokens, refresh, logout } = useContext(AuthContext);
    const [open, setOpen] = useState(true);
    const cancelButtonRef = useRef(null);
    const refresh_string = localStorage.getItem("refresh");
    refresh(refresh_string);
    const access = localStorage.getItem("access");

    //get data from backend
    const config = {
        headers: {
            Authorization: `Bearer ${access}`,
        },
    };

    const handleSubmit = (e) => {
        console.log(`Submit`)
        e.preventDefault();
        console.log(e.target.username.value)
        console.log(e.target.first_name.value)
        console.log(e.target.last_name.value)

        const url = `https://dhiker-api-v1.herokuapp.com/api/accounts/`;
        const obj = {

            username: e.target.username.value,
            first_name: e.target.first_name.value,
            last_name: e.target.last_name.value,
            email: e.target.email.value,
            phone_number: e.target.number.value,
            birthday: e.target.birthday.value,
            location: e.target.location.value,
            gender: e.target.gender.value,

        };
        console.log(obj)
        axios
            .put(`${url}update_profile/${id}/`, obj, config)
            .then((result) => {
                console.log(result.data);
                axios
                .get(`${url}users/${result.data.username}`, config)
                .then((result) => {
                    setUserData(result.data)
                })
                .catch((err) => {
                  console.log(err);
                });

            })
            .catch((err) => {
                const res = err.response.data
                console.log("updateprofile", err, typeof (res));
                console.log(res.hasOwnProperty("username"));
                if (res.hasOwnProperty("username")) {
                    Swal.fire({
                        icon: 'error',
                        text: `${res.email.email}`,
                    });
                }
                if (res.hasOwnProperty("password")) {
                    Swal.fire({
                        icon: 'error',
                        text: `${res.password}`,
                    });
                }
            });
        close();

    };

    return (
        <>
            <Transition.Root show={isOpen} as={Fragment} >
                <Dialog
                    as="div"
                    className="relative z-10"
                    initialFocus={cancelButtonRef}
                    onClose={close}
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
                                <Dialog.Panel className="relative overflow-hidden text-left transition-all transform bg-white rounded-lg shadow-2xl sm:my-8 sm:w-full sm:max-w-md">
                                    {/* <div className="px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4"> */}
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
                                                    id="username"
                                                    name="username"
                                                    required
                                                    className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 outline-none focus:border-green-400"
                                                    defaultValue={userData.username}

                                                />
                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600 "
                                                >
                                                    اسم المستخدم
                                                </label>
                                            </div>

                                            <div className="flex items-center mb-10">
                                                <input
                                                    type="text"
                                                    id="first_name"
                                                    name="first_name"
                                                    required
                                                    className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                                                    defaultValue={userData.first_name}
                                                />
                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                                                >
                                                    الإسم
                                                </label>
                                            </div>

                                            <div className="flex items-center mb-10">
                                                <input
                                                    type="text"
                                                    id="last_name"
                                                    name="last_name"

                                                    required
                                                    className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                                                    defaultValue={userData.last_name}

                                                />
                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                                                >

                                                    العائلة
                                                </label>
                                            </div>
                                            <div className="flex items-center mb-10">
                                                <input
                                                    type="email"
                                                    id="email"
                                                    name="email"

                                                    required
                                                    className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                                                    defaultValue={userData.email}

                                                />
                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                                                >

                                                    البريد الإلكتروني
                                                </label>
                                            </div>
                                            <div className="flex items-center mb-10">
                                                <input
                                                    type="number"
                                                    id="number"
                                                    name="number"

                                                    required
                                                    className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                                                    defaultValue={userData.phone_number}

                                                />
                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                                                >

                                                    رقم الهاتف
                                                </label>
                                            </div>
                                            <div className="flex items-center mb-10">
                                                <input
                                                    type="date"
                                                    id="birthday"
                                                    name="birthday"
                                                    min="1920-01-01"
                                                    max="2023-12-31"

                                                    required
                                                    className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                                                    defaultValue={userData.birthday}

                                                />
                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                                                >

                                                    تاريخ الميلاد
                                                </label>
                                            </div>
                                            <div className="flex items-center mb-10">
                                                <input
                                                    type="text"
                                                    id="location"
                                                    name="location"
                                                    required
                                                    className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                                                    defaultValue={userData.location}

                                                />
                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                                                >

                                                    مكان الاقامة
                                                </label>
                                            </div>

                                            <div className="flex items-center mb-10">
                                            <select
                                                name="gender"
                                                id="gender"
                                                required
                                                className="flex-1 py-2 text-right text-gray-600 border-b-2 border-gray-400 "
                                                defaultValue={userData.gender}

                                            >
                                                <option value="female">female</option>
                                                <option value="male">male</option>
                                            </select>

                                                <label
                                                    className="inline-block w-20 mr-6 font-bold text-right text-gray-600"
                                                >

                                                    الجنس
                                                </label>
                                            </div>



                                            <div className="text-left">
                                                <button className="px-8 py-3 font-bold text-white bg-teal-600 shadow-2xl rounded-3xl hover:bg-teal-800">
                                                    تعديل
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                    {/* </div> */}
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        </>
    );
}
