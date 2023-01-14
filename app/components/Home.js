'use client';

import React from "react";
import { useState } from "react";
import axios from "axios";
import Image from "next/image";
import home_img from 'public/assets/home_dhekraa.png'



export default function Home() {

    const [prayTimeState, SetPrayTimeState] = useState({})
    const [prayaddressState, SetPrayaddressState] = useState({})
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

                SetPrayaddressState({
                    timezone: item.meta.timezone,
                    gregorian: item.date.gregorian.date,
                    hijri: item.date.hijri.date,
                    dayName: item.date.hijri.weekday.ar,
                })
            }
        })
    }
    // console.log(prayTimeState)

    return (
        <section className="bg-white">
            <section className="mr-auto place-self-center lg:col-span-7">
                <Image
                    className="hidden lg:block relative h-[400px]"
                    src={home_img}
                />
                <Image
                    className="block lg:hidden relative h-[300px]"
                    src={home_img}
                />
            </section>


            <section on={prayTimes()} className="flex md:container md:mx-auto scroll-my-1.5">
                <table className="table-auto bg-white w-[60%] text-center text-black">
                    <thead>

                        <th>
                            <tr> الصلاة</tr>
                        </th>
                        <th>
                            <tr>وقت الأذان</tr>
                        </th>
                    </thead>
                    <tbody>
                        <th>
                            <tr>الفجر</tr>
                            <tr>الشروق</tr>
                            <tr>الظهر</tr>
                            <tr>العصر</tr>
                            <tr>المغرب</tr>
                            <tr>العشاء</tr>

                        </th>
                        <th>
                            

                            <tr>{prayTimeState.Fajr}</tr>
                            <tr>{prayTimeState.Sunrise}</tr>
                            <tr>{prayTimeState.Dhuhr}</tr>
                            <tr>{prayTimeState.Asr}</tr>
                            <tr>{prayTimeState.Maghrib}</tr>
                            <tr>{prayTimeState.Isha}</tr>
                        </th>
                    </tbody>
                </table>
                <section className="text-black text-right">
                    <h1>التاريخ : {prayaddressState.gregorian}</h1>
                    <h1>هجري : {prayaddressState.hijri}</h1>
                    <h1>اليوم : {prayaddressState.dayName}</h1>
                    <h1>{prayaddressState.timezone} : المنطقة الزمنية</h1>
                </section>
            </section>

        </section>
    )
}