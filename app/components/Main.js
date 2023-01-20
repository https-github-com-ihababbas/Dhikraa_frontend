'use client';

import React from "react";
import HomeForm from "./HomeForm";
import Hero from './Hero'
import DateAndDay from './DateAndDay'
import Counter_tsbeh from './Counter_tsbeh'
import styleSection from '../styles/formAndTsbeh.module.css'


export default function Main() {
    return (
        <>
            <Hero />
            <DateAndDay />
            <section className={`dark:bg-black bg-white hidden lg:block `}>
                <section className={`${styleSection.container}`}>
                    <HomeForm />
                    <Counter_tsbeh />
                </section>
            </section>
            <section className='dark:bg-black bg-white block lg:hidden'>
                <HomeForm />
                <Counter_tsbeh />
            </section>
            
        </>
    )
}