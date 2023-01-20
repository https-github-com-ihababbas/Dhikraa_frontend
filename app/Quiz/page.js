/* eslint-disable react/jsx-key */
"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import useSWR from 'swr'
import axios from "axios";
import Answer from "../components/answer";

export default function Todo() {
    const [strtflag, setStrtFlag] = useState(false)
    const x = localStorage.getItem("username")
    const { tokens, refresh } = useContext(AuthContext)
    const refresh_string = localStorage.getItem("refresh")
    refresh(refresh_string)
    const [mark, setMark] = useState(0);
    
    //Data Fetching part
    const access = localStorage.getItem("access")

    const config = {
        headers: {
            'Authorization': `Bearer ${access}`
        }
    }
    const url = `https://dhiker-api-v1.herokuapp.com/api/v1/quiz/`;

    const fetcher = url => axios.get(url, config).then(res => res.data);

    const { data, error, isLoading } = useSWR(url, fetcher);

    if (error) return <div>failed to load</div>
    if (isLoading) return <div>loading...</div>



    const chossen_id = new Set();
    for (let i = 0; chossen_id.size < 10; i++) {
        chossen_id.add(Math.ceil(Math.random() * (49)))



    }
    //console.log(chossen_id)
    const number_to_view = []
    chossen_id.forEach((item) => {
        number_to_view.push(data[item])

    })
    // console.log(number_to_view)

    function startQuiz() {
        setStrtFlag(true)
        setMark(0)
    }

   
    
    const submittHandeler = () => {
        // e.preventDefault();


        console.log("Submitt")
        console.log(Object.values(answer).reduce((a, b) => a + b))
        setMark(Object.values(answer).reduce((a, b) => a + b))
        setStrtFlag(false)
        
        
       

    }
    let answer = {}

    const answeruser = (value, id) => {
        console.log(id, value)
        if( value ==number_to_view[id].choices.correct){
            answer[id] = 1
        }else{
            
            answer[id] = 0
        }
        
        console.log(answer)
        // localStorage.setItem(id, value);


    }




    return (
        <>
            {tokens ?

                <section className="flex justify-end w-full bg-gray-200 ">



                    <div

                        className="pt-12 pb-12 font-sans text-gray-700 w-[40%] mr-10"
                    >


                        {!strtflag && <button onClick={startQuiz} type="button" className="mr-14 py-1.5 px-2 flex text-white bg-gradient-to-r from-[#1e8a9d] to-[#187584] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                            <div className="text-xl font-mono font-bold pt-0.5 px-2">
                                بدأ الاختبار
                            </div>
                            <span className="px-2 py-4 font-mono text-2xl text-gray-100 border-l-2 border-gray-100">
                            </span>
                        </button>}
                       



                            {strtflag && number_to_view.map((item, i) => (



                                <div className="flex-1 mt-1 text-right">
                                    <div

                                        className="w-full px-8 py-4 bg-white border rounded-lg shadow-lg">

                                        <h2 className="font-bold leading-none text-gray-900 ">
                                            <span className="block pb-2 text-sm text-blue-700"> {i + 1} السؤال</span>
                                            <span className="block pb-2">{item.question}</span>
                                        </h2>

                                        <Answer
                                            choices={item.choices}
                                            id={i}
                                            
                                            answeruser={answeruser}
                                        />
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
