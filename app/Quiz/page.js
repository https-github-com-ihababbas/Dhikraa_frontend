/* eslint-disable react/jsx-key */
"use client"
import React from "react";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../contexts/auth";
import useSWR from 'swr'
import axios from "axios";
import Answer from "../components/answer";
import Review from "./Review"
import Image from "next/image";
import quiz from "public/assets/quiz.png";

export default function Todo() {
    const [strtflag, setStrtFlag] = useState(false)
    const [submittflag, setSubmittFlag] = useState(false)
    const [reviewflag, setReviwFlag] = useState({})
    const [Quistion, setQuistion] = useState([])

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
        setSubmittFlag(false)
        
    }



    const submittHandeler = () => {
        // e.preventDefault();


        console.log("Submitt")
        if (Object.values(answer).length != 0) {

            console.log(Object.values(answer).reduce((a, b) => a + b))
            setMark(Object.values(answer).reduce((a, b) => a + b))
        }
        setStrtFlag(false)
        setSubmittFlag(true)
        console.log(review)
        setReviwFlag(review)
        setQuistion(number_to_view)




    }
    let answer = {}
    let review = {}

    const answeruser = (value, id) => {
        console.log(id, value)
        if (value == number_to_view[id].choices.correct) {
            answer[id] = 1
        } else {

            answer[id] = 0
        }
        review[id] = value
        console.log(answer)
        // localStorage.setItem(id, value);


    }




    return (
        <>
            <div className="flex w-full bg-gray-200 shadow-2xl h-80 right">
                <Image src={quiz} alt="todo" className="w-4/6 h-full" />
                <div className="w-2/6 pb-16 mr-1 text-3xl text-right text-gray-700">

                    <div className="border-b-2 border-teal-600 ">
                        <h1 className="py-4 text-center"> <span className="text-teal-600">{localStorage.getItem("username")} </span>أهلا بك </h1></div>
                    <h2 className="p-4 text-teal-800 ">
                        سيتكون الاختبار من عشرة اسئلة ضع دائرة فيها اربع خيارات مختلفة ، وعند انهاء الاختبار ستظهر لك علامتك من عشرة
                    </h2>


                </div>

            </div>







            {tokens ?

                <section className="flex justify-end w-full ">



                    <div

                        className="pt-12 pb-12 font-sans text-gray-700 w-[40%] mr-10"

                    >
                        {submittflag && <button onClick={startQuiz} type="button" className="mr-14 py-1.5 px-2 flex text-white bg-gradient-to-r from-[#1e8a9d] to-[#187584] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                            <div className="text-xl font-mono font-bold pt-0.5 px-2">
                                اعادة الاختبار
                            </div>
                            <span className="px-2 py-4 font-mono text-2xl text-gray-100 border-l-2 border-gray-100">
                            </span>
                        </button>}



                        {!strtflag && !submittflag && <button onClick={startQuiz} type="button" className="mr-14 py-1.5 px-2 flex text-white bg-gradient-to-r from-[#1e8a9d] to-[#187584] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

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
                        {!submittflag && strtflag &&
                            <button onClick={submittHandeler} type="button" className="mt-4 mr-14 py-1.5 px-2 flex text-white bg-gradient-to-r from-[#1e8a9d] to-[#187584] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                                <div className="text-xl font-mono font-bold pt-0.5 px-2">
                                    إنهاء الاختبار
                                </div>
                                <span className="px-2 py-4 font-mono text-2xl text-gray-100 border-l-2 border-gray-100">
                                </span>
                            </button>}

                        {submittflag &&
                            <>
                                {mark  >= 5 &&

                                    <h1 className="mr-16 text-xl font-bold text-right text-green-600 mt-[-2rem]">{mark}/10 : النتيجة   </h1>
                                }
                                { mark  < 5 &&

                                    <h1 className="mr-16 text-xl font-bold text-right text-red-600 mt-[-2rem]">{mark}/10 : النتيجة  </h1>
                                }

                                <Review
                                    number_to_view={Quistion}
                                    startQuiz={startQuiz}


                                    review={reviewflag}
                                />
                            </>

                        }




                    </div>
                </section>

                : <h1 classNameName="text-black">سارع بالتسجيل في الموقع لاستخدام هذة الميزة</h1>}
        </>
    );
}
