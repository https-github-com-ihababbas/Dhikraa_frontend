import React from "react";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import styles from 'app/styles/styles.module.css';
import stylesHome from '../styles/home.module.css'
import styleTabel from '../styles/DateAndDay.module.css'

export default function HomeForm() {


    const [prayTimeState, SetPrayTimeState] = useState({})
    const [prayClearTimeState, SetPrayClearTimeState] = useState({})



    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate()
    

    const prayTimes = async () => {
        'this function give an opject of pray times from api'
        const [dataTime, setDataTime] = useState('')

        let objDate = {
            year,
            month
        }
        // note: change address when we complet backend
        const url = 'https://api.aladhan.com/v1/calendarByAddress?address=ِAmman'
        const res = await axios.get(url, objDate)
            .then((result) => {
                setDataTime(result.data.data);
            })
            .catch((err) => {
                const x =err;
            });
        {
            dataTime != '' && dataTime.map(item => {
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
    }

    prayTimes()



    return (
        <div className="text-[#252f0b] rounded-b-md text-2xl text-[#252f0b] border-2 border-[#949e7b] mx-32  ">
            <div className="flex justify-between text-center">
                <div className="border-2 border-[#949e7b] w-1/6 h-24 text-center items-center pt-1 ">
                    <div className="w-full h-1/3">{prayClearTimeState.Isha}</div>
                    <img src='//timesprayer.com/images/isha.svg' className="w-full h-1/3" />
                    <p className="w-full h-1/3">العشاء</p>
                </div>
                <div className="border-2 border-[#949e7b] w-1/6 h-24 text-center items-center pt-1 bg-[#e5f2c4]">
                    <div className="w-full h-1/3">{prayClearTimeState.Maghrib}</div>
                    <img src='//timesprayer.com/images/maghrib.svg' className="w-full h-1/3" />
                    <p className="w-full h-1/3">المغرب</p>
                </div>
                <div className="border-2 border-[#949e7b] w-1/6 h-24 text-center items-center pt-1">
                    <div className="w-full h-1/3">{prayClearTimeState.Asr}</div>
                    <img src='//timesprayer.com/images/asr.svg' className="w-full h-1/3" />
                    <p className="w-full h-1/3">العصر</p>
                </div>
                <div className="border-2 border-[#949e7b] w-1/6 h-24 text-center items-center pt-1">
                    <div className="w-full h-1/3">{prayClearTimeState.Dhuhr}</div>
                    <img src='//timesprayer.com/images/dhuhr.svg' className="w-full h-1/3" />
                    <p className="w-full h-1/3">الظهر</p>
                </div>
                <div className="border-2 border-[#949e7b] w-1/6 h-24 text-center items-center pt-1">
                    <div className="w-full h-1/3">{prayClearTimeState.Sunrise}</div>
                    <img src='//timesprayer.com/images/sunrise.svg' className="w-full h-1/3" />
                    <p className="w-full h-1/3">الشروق</p>
                </div>
                <div className="border-2 border-[#949e7b] w-1/6 h-24 text-center items-center pt-1 ">
                    <div className="w-full h-1/3">{prayClearTimeState.Fajr}</div>
                    <img src='//timesprayer.com/images/fajr.svg' className="w-full h-1/3" />
                    <p className="w-full h-1/3">الفجر</p>
                </div>
                <div className="border-2 border-[#949e7b] w-1/6 h-24 text-center items-center pt-1">
                    <div className="w-full h-1/3">{prayClearTimeState.Imsak}</div>
                    <img src='//timesprayer.com/images/fajr.svg' className="w-full h-1/3" />
                    <p className="w-full h-1/3">الامساك</p>
                </div>

            </div>
            {/* <h1 className="m-3 text-2xl italic font-bold text-center text-teal-600">مواقيت صلاة اليوم</h1>
            <section className={stylesHome.section_form}>
                <section className={stylesHome.div}>
                    <table className={styles.table}>
                        <thead>
                            <tr className={styleTabel.tr}>
                                <th className={styles.th}>وقت الاذان</th>
                                <th className={styles.th}>الصلاة</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className={`${styles.current} ${styleTabel.tr}`}>
                                <td className={styles.td}>{prayClearTimeState.Imsak}</td>
                                <td className={styles.td}>الامساك</td>
                            </tr>
                            <tr className={`${styles.current} ${styleTabel.tr}`}>
                                <td className={styles.td}>{prayClearTimeState.Fajr}</td>
                                <td className={styles.td}>الفجر</td>
                            </tr>
                            <tr className={`${styles.current} ${styleTabel.tr}`}>
                                <td className={styles.td}>{prayClearTimeState.Sunrise}</td>
                                <td className={styles.td}>الشروق</td>
                            </tr>
                            <tr className={`${styles.current} ${styleTabel.tr}`}>
                                <td className={styles.td}>{prayClearTimeState.Dhuhr}</td>
                                <td className={styles.td}>الظهر</td>
                            </tr>
                            <tr className={`${styles.current} ${styleTabel.tr}`}>
                                <td className={styles.td}>{prayClearTimeState.Asr}</td>
                                <td className={styles.td}>العصر</td>
                            </tr>
                            <tr className={`${styles.current} ${styleTabel.tr}`}>
                                <td className={styles.td}>{prayClearTimeState.Maghrib}</td>
                                <td className={styles.td}>المغرب</td>
                            </tr>
                            <tr className={`${styles.current} ${styleTabel.tr}`}>
                                <td className={styles.td}>{prayClearTimeState.Isha}</td>
                                <td className={styles.td}>العشاء</td>
                            </tr>
                        </tbody>

                    </table>

                </section>
            </section> */}
        </div>

    )
}