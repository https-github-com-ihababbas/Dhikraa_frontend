"use client"

import React from "react";




export default function answer(props) {
    let value = 0
    let answers = []
    value = Object.values(props.choices)
    //console.log(value)
    value.sort()
    //console.log(value)

    for (let i = 0; i < 10; i++) {
        answers.push(props.choices.correct)
    }
    //console.log(answers)


    const saveAnswers = (id, e) => {
        props.answeruser(e.target.value, id)
    };









    return (

        <>
            

            <p>

                <section clasName="w-[30%]">

                    {value[0]} <input type="radio" id="answer" name={props.id} value={value[0]} className="text-left" onChange={(e) => { saveAnswers(props.id, e) }} />
                </section>
                <section clasName="w-[30%]">
                    {value[1]} <input type="radio" id="answer" name={props.id} value={value[1]} className="text-left" onChange={(e) => { saveAnswers(props.id, e) }} />
                </section>
                <section clasName="w-[30%]">
                    {value[2]} <input type="radio" id="answer" name={props.id} value={value[2]} className="text-left" onChange={(e) => { saveAnswers(props.id, e) }} />
                </section>
                <section clasName="w-[30%]">
                    {value[3]} <input type="radio" id="answer" name={props.id} value={value[3]} className="text-left" onChange={(e) => { saveAnswers(props.id, e) }} />
                </section>

            </p>

        </>
    )
}