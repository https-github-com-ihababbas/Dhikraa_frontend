
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
import style from "../styles/quiz.module.css"
import image from "public/assets/image.png";
import { Icon } from '@iconify/react';
import line_img from "public/assets/line.png";


export default function Quiz() {
    const [strtflag, setStrtFlag] = useState(false) //to start the quize
    const [submittflag, setSubmittFlag] = useState(false) //to submitt the quiz and get the mark 
    const [reviewflag, setReviwFlag] = useState({})    // to open the review page
    const [Quistion, setQuistion] = useState([])      //to save the qustion that render to the user
    const [mark, setMark] = useState(0);    // to save the mark 

    const x = localStorage.getItem("username")
    const { tokens, refresh } = useContext(AuthContext)
    const refresh_string = localStorage.getItem("refresh")
    refresh(refresh_string)

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

    if (error) return (

        <section className={style.back}>
            <section className="pt-6 ">
                <div className="flex justify-center">
                    
                <div className="text-5xl justify-center  text-[#252f0b]   ">

                    <h1 className="pl-5">
                        اِخْتَبَرَ مَعْلُومَاتِك
                    </h1>
                    <Image className="justify-center" width={280}  src={line_img} />
                </div>
                </div>


                <div className="flex justify-between h-full py-4 mb-4 ml-40 mr-40 rounded-md shadow-md flex-right">

                    <div className="relative justify-center w-1/4 h-50 ">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-[#949e7b] to-[#778554] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative shadow-lg sm:rounded-3xl sm:p-1 ">
                            <Image className="w-[95%] h-50 rounded-3xl rad" src={quiz} />
                        </div>
                    </div>
                    <div className="w-3/4">
                        <h1 className="mt-10 text-4xl justify-self-center text-right text-[#252f0b] dark:text-white" ></h1>
                        <br />



                        <h3 className="text-2xl text-[#252f0b]  text-right ml-32 mr-32 flex justify-between">
                            سَيَتَكَوَّنُ هَذَا اَلِاخْتِبَارِ مِنْ عَشَرَةِ اَسْلَة كُلَّ سُؤَالٍ مَعَ أَرْبَعِ خِيَارَاتٍ وَجَوَابٍ وَاحِدٍ هُوَ اَلصَّحِيحُ
                            <Icon icon="iconoir:system-restart" className="mx-4" />

                        </h3>
                        <h3 className="text-2xl text-[#252f0b]  text-right ml-32 mr-32 flex justify-between">
                            مَوَاضِيع اَلْأَسْئِلَةِ هِيَ اَلْقُرْآنُ اَلْكَرِيمُ اَلسِّيرَةَ اَلنَّبَوِيَّةَ مَعْلُومَاتٍ عَامَّةً وَالتَّجْوِيدُ
                            <Icon icon="iconoir:system-restart" className="mx-4" />

                        </h3>

                    </div>
                </div>
            </section>

            <div className="text-3xl text-center pt-12 h-[200px] ">
                سارع التسجيل في الموقع لاستخدام هذة الميزة
            </div>
        </section>
    )

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


    }




    return (
        <section className={style.back}>
            <section className="pt-6 ">
                <div className="flex justify-center">
                    
                <div className="text-5xl justify-center  text-[#252f0b]   ">

                    <h1 className="pl-5">
                        اِخْتَبَرَ مَعْلُومَاتِك
                    </h1>
                    <Image className="justify-center" width={280}  src={line_img} />
                </div>
                </div>


                <div className="flex justify-between h-full py-4 mb-4 ml-40 mr-40 rounded-md shadow-md flex-right">

                    <div className="relative justify-center w-1/4 h-50 ">
                        <div
                            className="absolute inset-0 bg-gradient-to-r from-[#949e7b] to-[#778554] shadow-lg transform -skew-y-6 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl">
                        </div>
                        <div className="relative shadow-lg sm:rounded-3xl sm:p-1 ">
                            <Image className="w-[95%] h-50 rounded-3xl rad" src={quiz} />
                        </div>
                    </div>
                    <div className="w-3/4">
                        <h1 className="mt-10 text-4xl justify-self-center text-right text-[#252f0b] dark:text-white" ></h1>
                        <br />



                        <h3 className="text-2xl text-[#252f0b]  text-right ml-32 mr-32 flex justify-between">
                            سَيَتَكَوَّنُ هَذَا اَلِاخْتِبَارِ مِنْ عَشَرَةِ اَسْلَة كُلَّ سُؤَالٍ مَعَ أَرْبَعِ خِيَارَاتٍ وَجَوَابٍ وَاحِدٍ هُوَ اَلصَّحِيحُ
                            <Icon icon="iconoir:system-restart" className="mx-4" />

                        </h3>
                        <h3 className="text-2xl text-[#252f0b]  text-right ml-32 mr-32 flex justify-between">
                            مَوَاضِيع اَلْأَسْئِلَةِ هِيَ اَلْقُرْآنُ اَلْكَرِيمُ اَلسِّيرَةَ اَلنَّبَوِيَّةَ مَعْلُومَاتٍ عَامَّةً وَالتَّجْوِيدُ
                            <Icon icon="iconoir:system-restart" className="mx-4" />

                        </h3>

                    </div>
                </div>
            </section>

            {tokens ?
                // className={style.back}

                <section className={`${style.backabout} flex justify-center pt-6 `}>



                    <div

                        className="pt-12 pb-12 font-sans text-gray-700 w-[40%] "

                    >
                        {submittflag && <button onClick={startQuiz} type="button" className=" mr-14 py-1.5 px-2 flex text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                            <div className="text-xl font-mono font-bold pt-0.5 px-2">
                                اعادة الاختبار
                            </div>
                            <span className="px-2 py-4 font-mono text-2xl text-gray-100 border-l-2 border-gray-100">
                            </span>
                        </button>}



                        {!strtflag && !submittflag && <button onClick={startQuiz} type="button" className="mb-4 ml-[40%]  py-1.5 px-2 flex text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                            <div className="text-xl font-mono font-bold pt-0.5 px-2">
                                إبدأ الاختبار
                            </div>
                            <span className="px-2 py-4 font-mono text-2xl text-gray-100 border-l-2 border-gray-100">
                            </span>
                        </button>}




                        {strtflag && number_to_view.map((item, i) => (



                            <div className="flex-1 mt-1 text-right">
                                <div

                                    className="w-full px-8 py-4 bg-white border rounded-lg shadow-lg">

                                    <h2 className="font-bold leading-none text-gray-900 ">
                                        <span className="block pb-2 text-sm text-[#3a451c]"> {i + 1} السؤال</span>
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
                            <button onClick={submittHandeler} type="button" className="mt-4 mr-14 py-1.5 px-2 flex text-white bg-gradient-to-r from-[#778554] to-[#3a451c] hover:bg-gradient-to-l focus:outline-none focus:ring-purple-200 font-medium rounded-2xl text-sm  text-center  ">

                                <div className="text-xl font-mono font-bold pt-0.5 px-2">
                                    إنهاء الاختبار
                                </div>
                                <span className="px-2 py-4 font-mono text-2xl text-gray-100 border-l-2 border-gray-100">
                                </span>
                            </button>}

                        {submittflag &&
                            <>
                                {mark >= 5 &&

                                    <h1 className="mr-16 text-xl font-bold text-right text-green-600 mt-[-2rem]">{mark}/10 : النتيجة   </h1>
                                }
                                {mark < 5 &&

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


                : <div className="text-3xl text-center pt-12 h-[200px] ">
                    سارع التسجيل في بالموقع لاستخدام هذة الميزة
                </div>}
        </section>
    );
}
