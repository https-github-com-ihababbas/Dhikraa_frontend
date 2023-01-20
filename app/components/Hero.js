import React from "react";
import Image from "next/image";
import home_img from 'public/assets/Home_page.png';
import { ayat } from './data/ayat';
import { useEffect, useState } from "react";
import styles from '../styles/home.module.css'


export default function Hero() {

    const [ayatState, setAyatState] = useState('')

    useEffect(() => {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * ayat.length);
            setAyatState(ayat[randomIndex].ayah)
        }, 100);
    }, [])

    return(
        <>
            <section className={`${styles.section} dark:bg-black bg-white`}>

                <Image
                    className={`${styles.hidden} ${styles['lg:block']} ${styles.relative} ${styles['h-400px']} ${styles['w-80%']}`}
                    src={home_img}
                    alt=""
                />
                
                <div  className={`block lg:hidden ${styles.container} text-zinc-50 text-3xl bg-gray-500 opacity-70`}>

                    <h1>{ayatState[0]}</h1>
                    <h1>{ayatState[1]}</h1>

                </div>

                <div  className={`hidden lg:block ${styles.container1} text-zinc-50 text-3xl bg-gray-500 opacity-70`}>

                    <h1>{ayatState[0]}</h1>
                    <h1>{ayatState[1]}</h1>

                </div>

            </section>
        </>
    )
}