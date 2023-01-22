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
        const[dataTime,setDataTime]=useState('')

        let objDate = {
            year,
            month
        }

        // note: change address when we complet backend
    
        const url = 'https://api.aladhan.com/v1/calendarByAddress?address=ِAmman'
        const res = await axios.get(url, objDate)
        // const dataTime = res.data.data
        .then((result) => {
            setDataTime(result.data.data);
          })
          .catch((err) => {
            console.log(err);
          });
          {dataTime!='' && dataTime.map(item => {
            if (item.date.gregorian.day == day) {
                SetPrayaddressState({
                    gregorian: item.date.gregorian.date,
                    hijri: item.date.hijri.date,
                    dayName: item.date.hijri.weekday.ar,
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

        })}
    }
    timeAndAdress()
    return (
        <section className={`${style.section} `}>
            <section className={`${style.span}`}>
                <div className={`${style.div}`}>
                    <h1>التاريخ : <span className="text-sm">{prayaddressState.gregorian}</span></h1>
                    <h1>التاريخ الهجري : <span className="text-sm">{prayaddressState.hijri}</span></h1>
                    <h1>اليوم : <span className="text-sm">{prayaddressState.dayName}</span></h1>
                    <h1><span className="text-sm">{prayClearaddressState.timezone} : المكان</span></h1>
                </div>
            </section>
        </section>
    )
}