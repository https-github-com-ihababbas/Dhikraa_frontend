'use client';

import React from "react";
import { useState } from "react";
import Image from "next/image";
import axios from "axios";
import { adkar } from './data/adkar'
import styles from 'app/styles/styles.module.css';
import stylesHome from '../styles/home.module.css'
import styleSection from '../styles/formAndTsbeh.module.css'
import styleTabel from '../styles/DateAndDay.module.css'
import Modal from './Modal'


import dakir1 from 'public/assets/Dakir1.png'
import dakir2 from 'public/assets/Dakir2.png'
import dakir3 from 'public/assets/Dakir3.png'
import dakir4 from 'public/assets/Dakir4.png'
import dakir5 from 'public/assets/Dakir5.png'

export default function HomeForm() {

    const images = [dakir1, dakir2, dakir3, dakir4, dakir5]
    const [prayTimeState, SetPrayTimeState] = useState({})
    const [prayClearTimeState, SetPrayClearTimeState] = useState({})
    const [open, setOpen] = useState(false)
    const [imageIndexState, SetImageIndexState] = useState(0)

    const setModalIsOpenToTrue = (index) => {
        setOpen(true)
        SetImageIndexState(index)
    }

    const setModalIsOpenToFalse = () => {
        setOpen(false)
    }


    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate()

    async function prayTimes() {
        'this function give an opject of pray times from api'

        let objDate = {
            year,
            month
        }

        // note: change address when we complet backend
        const url = 'https://api.aladhan.com/v1/calendarByAddress?address=ِAmman'
        const res = await axios.get(url, objDate)

        const dataTime = res.data.data
        dataTime.map(item => {
            if (item.date.gregorian.day == day) {

                SetPrayTimeState({
                    Fajr: item.timings.Fajr,
                    Sunrise: item.timings.Sunrise,
                    Dhuhr: item.timings.Dhuhr,
                    Asr: item.timings.Asr,
                    Maghrib: item.timings.Maghrib,
                    Imsak: item.timings.Imsak,
                    Isha: item.timings.Isha,
                })

                SetPrayClearTimeState(Object.fromEntries(
                    Object.entries(prayTimeState).map(([key, value]) => {
                        let words = value.split(" ");
                        words.splice(1, 1);
                        return [key, words.join(" ")];
                    })
                ))
            }
        })
    }





    return (
        <section className={`${styleSection.section2}`}>
            <section on={prayTimes()} className={stylesHome.div}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styleTabel.tr}>
                            <th className={styles.th}>prayers</th>
                            <th className={styles.th}>Azan time</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>Imsak</td>
                            <td className={styles.td}>{prayClearTimeState.Imsak}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>Fajr</td>
                            <td className={styles.td}>{prayClearTimeState.Fajr}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>Sunrise</td>
                            <td className={styles.td}>{prayClearTimeState.Sunrise}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>Dhuhr</td>
                            <td className={styles.td}>{prayClearTimeState.Dhuhr}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>Asr</td>
                            <td className={styles.td}>{prayClearTimeState.Asr}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>Maghrib</td>
                            <td className={styles.td}>{prayClearTimeState.Maghrib}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>Isha</td>
                            <td className={styles.td}>{prayClearTimeState.Isha}</td>
                        </tr>
                    </tbody>

                </table>

            </section>



            <section className={stylesHome.section}>

                <section className={stylesHome.section_all}>
                    <Image onClick={() => setModalIsOpenToTrue(0)} className={`${stylesHome.section_img}`} src={images[0]} />
                </section>

                <section className={stylesHome.section_all}>
                    <Image onClick={() => setModalIsOpenToTrue(1)} className={`${stylesHome.section_img}`} src={images[1]} />
                </section>

                <section className={stylesHome.section_all}>
                    <Image onClick={() => setModalIsOpenToTrue(2)} className={`${stylesHome.section_img}`} src={images[2]} />
                </section>

                <section className={stylesHome.section_all}>
                    <Image onClick={() => setModalIsOpenToTrue(3)} className={` ${stylesHome.section_img}`} src={images[3]} />
                </section>

                <section className={stylesHome.section_all}>
                    <Image onClick={() => setModalIsOpenToTrue(4)} className={`${stylesHome.section_img}`} src={images[4]} />
                </section>

                <Modal isopen={open} close={setModalIsOpenToFalse} adkar={adkar[imageIndexState]} img={images[imageIndexState]} />
            </section>
        </section>

    )
}