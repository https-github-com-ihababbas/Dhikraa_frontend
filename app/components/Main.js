'use client';

import React from "react";
import HomeForm from "./HomeForm";
import Hero from './Hero'
import DateAndDay from './DateAndDay'
import Counter_tsbeh from './Counter_tsbeh'
import styleSection from  '../styles/formAndTsbeh.module.css'


export default function Main() {
    return (
        <>
            <Hero />
            <DateAndDay />
            <section className={styleSection.container}>
                <HomeForm />
                <Counter_tsbeh />
            </section>
        </>
    )
}