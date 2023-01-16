'use client';

import React from "react";
import { useState } from "react";
import axios from "axios";
import styles from 'app/styles/styles.module.css';
import stylesHome from '../styles/home.module.css'
import styleSection from  '../styles/formAndTsbeh.module.css'
import styleTabel from '../styles/DateAndDay.module.css'

export default function Home() {

    const [prayTimeState, SetPrayTimeState] = useState({})

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
                    Isha: item.timings.Isha,
                    Imsak: item.timings.Imsak,
                })


            }
        })
    }



    return (
        <section className={`${styleSection.section2}`}>
            <section on={prayTimes()} className={stylesHome.div}>
                <table className={styles.table}>
                    <thead>
                        <tr className={styleTabel.tr}>
                            <th className={styles.th}>الصلاة</th>
                            <th className={styles.th}>وقت الأذان</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>الفجر</td>
                            <td className={styles.td}>{prayTimeState.Fajr}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>الشروق</td>
                            <td className={styles.td}>{prayTimeState.Sunrise}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>الظهر</td>
                            <td className={styles.td}>{prayTimeState.Dhuhr}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>العصر</td>
                            <td className={styles.td}>{prayTimeState.Asr}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>المغرب</td>
                            <td className={styles.td}>{prayTimeState.Maghrib}</td>
                        </tr>
                        <tr className={`${styles.current} ${styleTabel.tr}`}>
                            <td className={styles.td}>العشاء</td>
                            <td className={styles.td}>{prayTimeState.Isha}</td>
                        </tr>
                    </tbody>

                </table>

            </section>
            <section>
                hello
            </section>
        </section>
    )
}