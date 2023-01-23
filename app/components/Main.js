'use client';

import React from "react";
import Hero from './Hero'
import HomeForm from "./HomeForm";
import DateAndDay from './DateAndDay'
import Counter_tsbeh from './Counter_tsbeh'
import styleHome from '../styles/home.module.css'
import HomeModal from './HomeModal'
import Ramdan from '../components/ramadancountdown'


export default function Main() {
    return (
        <>
            <Hero />
            
            <DateAndDay />
            <HomeForm />
            <Ramdan />
            <Counter_tsbeh />

            {/* <HomeModal /> */}

            {/* <section className={styleSection.container}>
                <section className={styleSection.section1}>
                </section>
                <section className={styleSection.section2}>
                </section>
            </section> */}
        </>

    )
}