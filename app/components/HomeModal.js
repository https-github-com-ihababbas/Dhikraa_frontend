import React from "react";
import { useState } from "react";
import Image from "next/image";
import { adkar } from './data/adkar'
import stylesHome from '../styles/home.module.css'
import Modal from './Modal'

import dakir1 from 'public/assets/Dakir1.png'
import dakir2 from 'public/assets/Dakir2.png'
import dakir3 from 'public/assets/Dakir3.png'
import dakir4 from 'public/assets/Dakir4.png'
import dakir5 from 'public/assets/Dakir5.png'

export default function HomeModal() {
    const images = [dakir1, dakir2, dakir3, dakir4, dakir5]
    const [open, setOpen] = useState(false)
    const [imageIndexState, SetImageIndexState] = useState(0)
    const [numPageState, SetNumPageState] = useState(1)

    const setModalIsOpenToTrue = (index) => {
        setOpen(true)
        SetImageIndexState(index)
    }

    const setModalIsOpenToFalse = () => {
        setOpen(false)
        SetNumPageState(1)
    }

    return (
    <section className="shadow-xl">
        <h1 className="m-3 text-2xl italic font-bold text-center text-teal-600">اذكار و الادعية</h1>
        <section className={stylesHome.section_modal}>
            
            <section className={stylesHome.section_all}>
                <Image onClick={() => setModalIsOpenToTrue(0)} className={`${stylesHome.section_img}`} src={images[0]} alt='' />
            </section>

            <section className={stylesHome.section_all}>
                <Image onClick={() => setModalIsOpenToTrue(1)} className={`${stylesHome.section_img}`} src={images[1]} alt='' />
            </section>

            <section className={stylesHome.section_all}>
                <Image onClick={() => setModalIsOpenToTrue(2)} className={`${stylesHome.section_img}`} src={images[2]} alt='' />
            </section>

            <section className={stylesHome.section_all}>
                <Image onClick={() => setModalIsOpenToTrue(3)} className={` ${stylesHome.section_img}`} src={images[3]} alt='' />
            </section>

            <section className={stylesHome.section_all}>
                <Image onClick={() => setModalIsOpenToTrue(4)} className={`${stylesHome.section_img}`} src={images[4]} alt='' />
            </section>

            <Modal isopen={open} close={setModalIsOpenToFalse} adkar={adkar[imageIndexState]} img={images[imageIndexState]} page={numPageState} />
        </section>
    </section>
    )
}