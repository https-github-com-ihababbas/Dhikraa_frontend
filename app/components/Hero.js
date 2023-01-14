import React from "react";
import Image from "next/image";
import home_img from 'public/assets/Home_page.png';
import { ayat } from './data/ayat';
import { useEffect, useState } from "react";
import styles from '/home/alghzawi/Dhikraa_final_project/Dhikraa_frontend/app/home.module.css'


export default function Hero() {

    const [ayatState, setAyatState] = useState('')

    useEffect(() => {
        
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * ayat.length);
            setAyatState(ayat[randomIndex].ayah)
        }, 5000);
    }, [])
    

    return(
        <section className={`${styles.section} bg-white`}>
            <Image
                className={`${styles.hidden} ${styles['lg:block']} ${styles.relative} ${styles['h-400px']} ${styles['w-80%']}`}
                src={home_img}
                alt=""
            />
            
            <h1 className={`${styles.container} text-black`}>{ayatState}</h1>
        </section>
    )
}