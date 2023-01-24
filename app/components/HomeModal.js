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
import link_line from 'public/assets/link-line.png'
import link_line2 from 'public/assets/link-line2.png'

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
    <section className="mt-44 pb-44">
        <h1 className="text-5xl border-b-2 mx-[29%] border-[#778554] justify-self-center text-center text-[#252f0b] dark:text-white mb-4 pb-2">اذكار و الادعية</h1>
        <section className="flex px-20">
            
            <section className="w-full">
                <Image className="rounded-3xl hover:shadow-2xl  hover:shadow-[#252f0b]" onClick={() => setModalIsOpenToTrue(0)} src={images[0]} alt='' />
            </section>
            <Image src={link_line} className="w-32 h-32" />

            <section className="w-full">
                <Image className="rounded-3xl hover:shadow-2xl  hover:shadow-[#252f0b]" onClick={() => setModalIsOpenToTrue(1)} src={images[1]} alt='' />
            </section>
            <Image src={link_line2} className="w-32 h-32" />

            <section className="w-full">
                <Image className="rounded-3xl hover:shadow-2xl  hover:shadow-[#252f0b]" onClick={() => setModalIsOpenToTrue(2)} src={images[2]} alt='' />
            </section>
            <Image src={link_line} className="w-32 h-32" />

            <section className="w-full">
                <Image className="rounded-3xl hover:shadow-2xl  hover:shadow-[#252f0b]" onClick={() => setModalIsOpenToTrue(3)} src={images[3]} alt='' />
            </section>
            <Image src={link_line2} className="w-32 h-32" />

            <section className="w-full">
                <Image className="rounded-3xl hover:shadow-2xl  hover:shadow-[#252f0b]" onClick={() => setModalIsOpenToTrue(4)} src={images[4]} alt='' />
            </section>
            

            <Modal isopen={open} close={setModalIsOpenToFalse} adkar={adkar[imageIndexState]} img={images[imageIndexState]} page={numPageState} />
        </section>
    </section>
    )
}