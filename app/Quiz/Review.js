/* eslint-disable react/jsx-key */
"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import useSWR from 'swr'
import axios from "axios";
import Answer from "../components/answer";

export default function Todo(props) {
    const { tokens, refresh } = useContext(AuthContext)


    return (
        <>
            {tokens ?

                <section className="flex justify-end w-full ">



                    <div

                        className="pt-5 pb-12 font-sans text-gray-700 w-[100%] mr-10"
                    >







                        {props.number_to_view.map((item, i) => (



                            <div className="flex-1 mt-1 text-right">
                                <div

                                    className="w-full px-8 py-4 bg-white border rounded-lg shadow-lg">

                                    <h2 className="font-bold leading-none text-gray-900 ">
                                        <span className="block pb-2 text-sm text-blue-700"> {i + 1} السؤال</span>
                                        <span className="block pb-2 text-lg">{item.question}</span>
                                    </h2>

                                    <section className="font-bold text-green-700" >

                                        الإجابه الصحيحة :  {item.choices.correct}
                                    </section>
                                    <section  >
                                        إجابتك :   {props.review[i] || "لا يوجد إجابة"}
                                    </section>
                                </div>

                            </div>




                        ))}




                    </div>
                </section>

                : <h1 classNameName="text-black">You dont have access for this feature</h1>}
        </>
    );
}
