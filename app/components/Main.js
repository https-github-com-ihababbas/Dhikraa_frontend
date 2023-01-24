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
            <section className={`bg-[#e5f2c4] `}>

                <DateAndDay />
                <HomeForm />
                <Ramdan />
                <Counter_tsbeh />
                <HomeModal />

            </section>
        </>
    )
}