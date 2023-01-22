'use client';

import React from "react";
import HomeForm from "./HomeForm";
import Hero from './Hero'
import DateAndDay from './DateAndDay'
import Counter_tsbeh from './Counter_tsbeh'
import styleSection from '../styles/formAndTsbeh.module.css'
import HomeModal from './HomeModal'
import Ramdan from '../components/ramadancountdown'


export default function Main() {
    return (
        <>
        
            <Hero />
            <Ramdan />
            <DateAndDay />
            <section className={styleSection.container}>
                <section className={styleSection.section1}>
                    <HomeModal />
                </section>
                <section className={styleSection.section2}>
                    <HomeForm />
                    <Counter_tsbeh />
                </section>
            </section>
        </>
    )
}