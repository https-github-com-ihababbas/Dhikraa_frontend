import React from "react";
import Image from "next/image";
import home_img from 'public/assets/Home_img1.png';
import { ayat } from './data/ayat';
import { useEffect, useState } from "react";
import style from "../styles/home.module.css"
import image from "public/assets/image.png";


export default function Hero() {

    const [ayatState, setAyatState] = useState('')

    useEffect(() => {
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * ayat.length);
            setAyatState(ayat[randomIndex].ayah)
        }, 100);
    }, [])

    return (
        <div className={style.wp_caption} >
            <Image
                src={home_img}
                alt="background"
                className={style.demo} />

            <div className={style.wp_caption_text}>

                <h1 className={style.lineUp }>{ayatState[0]}</h1>

                <p className={style.lineUp2}>{ayatState[1]}</p>


            </div>
        </div>
    )
}