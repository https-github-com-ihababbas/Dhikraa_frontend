"use client"
import { use } from "react";
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import Image from "next/image";
import useSWR from 'swr'
import axios from "axios";
import Link from "next/link";


export default function Todo() {
    const [strtflag, setStrtFlag] = useState(false)
    const x = localStorage.getItem("username")
    const { tokens, refresh } = useContext(AuthContext)
    const refresh_string = localStorage.getItem("refresh")
    // console.log("Refreshing tokens888888888888888888",refresh_string)
    refresh(refresh_string)


    //Data Fetching part

    const access = localStorage.getItem("access")

    const config = {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    }
    const url = `https://dhiker-api-v1.herokuapp.com/api/v1/quiz/`;
    // console.log(`Bearer ${access}`);

    const fetcher = url => axios.get(url, config).then(res => res.data);
    // console.log("fetcher",fetcher)

    const { data, error, isLoading } = useSWR(url, fetcher);
    console.log(error)

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>
    // console.log(data[1].id)


    const chossen_id = new Set();
    // console.log(chossen_id.size)
    for (let i = 0; chossen_id.size < 10; i++) {
        chossen_id.add(Math.ceil(Math.random() * (49)))



    }
    console.log(chossen_id)
    const number_to_view = []
    chossen_id.forEach((item) => {
        number_to_view.push(data[item])

    })
    console.log(number_to_view)

    function startQuiz() {
        setStrtFlag(true)
    }





    return (
        <>
            {tokens ?
                <>


                    <div
                        style={{ minHeight: '300vh', }}
                        className="relative flex flex-col px-4 pt-24 pb-12 font-sans text-gray-700 bg-gray-200 sm:px-6 lg:px-8 "
                    >
                        
                        <button onClick={startQuiz} type="button" className="w-[15%] inline-flex text-white bg-gradient-to-r from-[#1e8a9d] to-[#187584] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-2xl text-sm px-5 py-2 text-center mr-2 mb-5 ml-20">
                            
                            <span class="px-2 py-4 text-2xl text-gray-100 border-l-2 border-gray-100 font-mono">
                            </span>
                            <div class="text-xl font-mono font-bold pt-0.5">
                                start Quiz
                            </div>
                        </button>
                        {strtflag && number_to_view.map((item, i) => (
                            // eslint-disable-next-line react/jsx-key
                            <div className="flex-1 mt-1 space-y-8">
                                <div
                                    style={{ top: "calc(1rem * 1)" }}
                                    className="w-full max-w-xl px-8 py-12 space-y-4 bg-white border rounded-lg shadow-lg mx-28 ">

                                    <h2 className="space-y-1 text-2xl font-bold leading-none text-gray-900">
                                        <span className="block text-sm text-blue-700">Quistion # {i + 1} </span>
                                        <span className="block">{item.question}</span>
                                    </h2>
                                    <p>
                                        {item.choices.correct}
                                    </p>
                                </div>

                            </div>



                        ))}


                    </div>
                </>

                : <h1 classNameName="text-black">You dont have access for this feature</h1>}
        </>
    );
}
