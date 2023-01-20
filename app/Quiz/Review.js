/* eslint-disable react/jsx-key */
"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import useSWR from 'swr'
import axios from "axios";
import Answer from "../components/answer";

export default function Todo() {
   


    




    return (
        <>
            {tokens ?

                <section className="flex justify-end w-full bg-gray-200 ">



                    <div

                        className="pt-12 pb-12 font-sans text-gray-700 w-[40%] mr-10"
                    >


                       




                        { number_to_view.map((item, i) => (



                            <div className="flex-1 mt-1 text-right">
                                <div

                                    className="w-full px-8 py-4 bg-white border rounded-lg shadow-lg">

                                    <h2 className="font-bold leading-none text-gray-900 ">
                                        <span className="block pb-2 text-sm text-blue-700"> {i + 1} السؤال</span>
                                        <span className="block pb-2">{item.question}</span>
                                    </h2>

                                    <section clasName="w-[30%]">

                                        {value[0]} <input type="radio" id="answer" name={props.id} value={value[0]} className="text-left" onChange={(e) => { saveAnswers(props.id, e) }} />
                                    </section>
                                    <section clasName="w-[30%]">
                                        {value[1]} <input type="radio" id="answer" name={props.id} value={value[1]} className="text-left" onChange={(e) => { saveAnswers(props.id, e) }} />
                                    </section>
                                </div>

                            </div>




                        ))}
                        <button onClick={submittHandeler} >submit</button>
                        <h1>{mark}</h1>




                    </div>
                </section>

                : <h1 classNameName="text-black">You dont have access for this feature</h1>}
        </>
    );
}
