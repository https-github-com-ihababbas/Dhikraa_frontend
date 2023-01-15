'use client';

import React from "react";
import { useState } from "react";
import axios from "axios";
import Counter_tsbeh from './Counter_tsbeh'
import DateAndDay from "./DateAndDay";


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

        <section on={prayTimes()} className="flex md:container md:mx-auto scroll-my-1.5">
            <table className="table-auto bg-white w-[60%] text-center text-black">

                <tr>
                    <th>الصلاة</th>
                    <th>وقت الأذان</th>
                </tr>
                <tr>
                    <td>الفجر</td>
                    <td>{prayTimeState.Fajr}</td>
                </tr>
                <tr>
                    <td>الشروق</td>
                    <td>{prayTimeState.Sunrise}</td>
                </tr>
                <tr>
                    <td>الظهر</td>
                    <td>{prayTimeState.Dhuhr}</td>
                </tr>
                <tr>
                    <td>العصر</td>
                    <td>{prayTimeState.Asr}</td>
                </tr>
                <tr>
                    <td>المغرب</td>
                    <td>{prayTimeState.Maghrib}</td>
                </tr>
                <tr>
                    <td>العشاء</td>
                    <td>{prayTimeState.Isha}</td>
                </tr>

            </table>
            
        </section>

    )
}