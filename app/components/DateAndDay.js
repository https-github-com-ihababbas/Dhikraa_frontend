import React from "react";
import { useState } from "react";
import axios from "axios";
import style from '../styles/DateAndDay.module.css'


export default function DateAndDay() {

    const [prayaddressState, SetPrayaddressState] = useState({})
    const [prayClearaddressState, SetPrayClearaddressState] = useState({})
    

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
                try{
                    SetPrayClearaddressState({
                    
                        timezone: prayaddressState.timezone.split("/")[1]
                    })
                }
                catch(err){
                    
                }
            }
                
        })
    }
    return (
        <section on={timeAndAdress()} className={`${style.section}`}>
            <section className={`${style.span}`}>
                <div className={`${style.div}`}>
                    <h1>Date : <span className="text-sm">{prayaddressState.gregorian}</span></h1>
                    <h1>Hijri : <span className="text-sm">{prayaddressState.hijri}</span></h1>
                    <h1>Day : <span className="text-sm">{prayaddressState.dayName}</span></h1>
                    <h1>Time Zone : <span className="text-sm">{prayClearaddressState.timezone}</span></h1>
                </div>
            </section>
        </section>
    )
}