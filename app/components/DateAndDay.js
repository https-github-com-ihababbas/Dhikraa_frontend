import React from "react";
import { useState } from "react";
import axios from "axios";


export default function DateAndDay() {

    const [prayaddressState, SetPrayaddressState] = useState({})

    const date = new Date();
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate()

    async function timeAndAdress() {
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
                SetPrayaddressState({
                    gregorian: item.date.gregorian.date,
                    hijri: item.date.hijri.date,
                    dayName: item.date.gregorian.weekday.en,
                    timezone: item.meta.timezone,
                })
            }
        })
    }
    return (
        <section on={timeAndAdress()} className="flex md:container md:mx-auto scroll-my-1.5">
            <section className="text-right">
                <span>التاريخ : {prayaddressState.gregorian}</span>
                <span>هجري : {prayaddressState.hijri}</span>
                <span>اليوم : {prayaddressState.dayName}</span>
                <span>المنطقة الزمنية : {prayaddressState.timezone}</span>
            </section>
        </section>
    )
}