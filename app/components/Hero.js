import React from "react";
import Image from "next/image";
import home_img from 'public/assets/Home_page.png';
import { ayat } from './data/ayat';
import { useEffect, useState } from "react";
import style from "../styles/quiz.module.css"
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
                src={image}
                alt="background"
                width={9999}
                height={300}
                className={style.demo} >

            </Image>
            <div className={style.wp_caption_text}>

                <h1 className="leading-normal mx-32 relative pt-32 text-4xl text-[#e5f2c4] ">{ayatState[0]}</h1>

                <p className="text-[#e5f2c4]">{ayatState[1]}</p>


            </div>
        </div>
    )
}